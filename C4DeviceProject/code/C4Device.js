// v 2.0
// This patch can now provide the USER mode functionality in cooperation with Markus's C4 Remote Script for Live 12.
// v1.0
// this is the project's main "C4Device" javascript file
// (the inlets and outlets are defined here)
// This javascript implements a "C4 device midi data" server where the C4 itself is the
// server's only "midi data client" connection.  The only other client is "this Max patch"
// which provides two main signals that influence what "feedback" appears on the C4 "display"
// a repeating stream of "encoder ID" numbers (0 - 31) or a "stop sign".
// "display" means every component on the C4 (4 LCD screens, 9 button LEDS, 32 encoder LED rings)
// a "display-page" is like one frame of animation or a "screen frame" in graphics FPS terms.
// "frame rate" is the rate at which "sequencer step" processing requests are handled.  The C4
// can only physically handle so much data per millisecond, but that line is somewhere north of
// about 10 "display-pages-per-second".
//
// The loadUp() function should be called before any midi messages get received and processed.
// AND loadUp() should finish running before any of the associated Max Dict objects are "ready" (loaded)
//
// Otherwise, the "public" functions are designed to be:
// function midievent(midiMsgIn) {
// function midiSysexEvent(byte) {
// function processSequencerStep(encoderId) {
// function clearLastSequencerStep(signal) {
// function saveCurrentControllerDictToFile(filename) {
// function loadCurrentControllerDictFromFile(filename) {
//
//
inlets = 1;
outlets = 3;// 0 for Note and CC messages, 1 for SYSEX messages, 2 not implemented
//
//
//   ---- C4Device js-object definitions -----
//
//

include("Consts.js");
include("C4Button.js");
include("C4Encoder.js");
include("C4DeviceController.js");

var lastEncoderPageOffset = 0;
var lastTopSysex = [];
var lastBtmSysex = [];
var isInitialized = false;
var utilEncoder = new C4Encoder();
var utilButton = new C4Button();
var controller = new C4DeviceController("single");

function loadUp(modeSelect) {
    if (!isInitialized) {
        // Run garbage collection to clear out any old objects.
        gc();
        if (!(modeSelect === 0 || modeSelect === 127)) {
            modeSelect = 127;
        }
        initControllerDict();
        initButtons(modeSelect);
        initEncoders();
        encLedRingFeedbackStyleDict.import_json("ledRingFeedbackStyleReference.json");
        encIndexesByLcdRowDict.import_json("rowMap16RowsOf8Keys.json");
        saveInitControllerDictToFile();
        if (modeSelect === 127) {
            sendEncoderPageData(generateWelcomePageMsgs);
        }
        isInitialized = true;
    }
}
function forceLoadUp() {
    isInitialized = false;
    loadUp();
}


function initControllerDict() {
    c4DeviceControllerDict.name = "C4DeviceExecutiveController";
    var tempDictStr = controller.toJsonStr();
    c4DeviceControllerDict.parse(tempDictStr);
}

function saveInitControllerDictToFile() {
    c4DeviceControllerDict.name = "C4DeviceExecutiveController";
    var f = new Folder("data");
    //post("pathname for 'data' folder is", f.pathname); post();
    var saveFile = f.pathname + "/c4ControllerInit.json"
    c4DeviceControllerDict.export_json(saveFile);
}

function saveCurrentControllerDictToFile(filename) {
    c4DeviceControllerDict.name = "C4DeviceExecutiveController";
    //post("pathname for save file is", filename); post();
    currentDeckName = reqModule.getActiveControllerDeckName();// fresh assignment only necessary for actual file saves?
    updateActiveControllerDeckForSave(currentDeckName);

    var controllerDictStr = controller.toJsonStr();
    var maxDictStr = JSON.stringify(JSON.parse(c4DeviceControllerDict.stringify()));
    if (!reqModule.compareSaveData(controllerDictStr, maxDictStr)) {
        post("C4Device.saveCurrentControllerDictToFile(): assumption issue, js controller object and Max js Dict object don't have the same JSON data to save"); post();
        var end = filename.toString().lastIndexOf(".");
        var ext = filename.toString().substring(end);
        var path = filename.toString().substring(0, end);
        var newFilename = path + "_jsControllerSaveData" + ext;
        //post("C4Device.saveCurrentControllerDictToFile(): constructed mismatched filename:",newFilename);post();
        var d = new Dict("badSaveCompare");
        d.parse(controllerDictStr);
        //post("C4Device.saveCurrentControllerDictToFile(): saving JS executive Object to file:", filename);post();
        d.export_json(newFilename);
    }
    //post("C4Device.saveCurrentControllerDictToFile(): saving failed-save Max executive Dict to file:", filename);post();
    c4DeviceControllerDict.export_json(filename);
}

function loadCurrentControllerDictFromFile(filename) {
    c4DeviceControllerDict.name = "C4DeviceExecutiveController";
    //post("pathname for import data is", filename); post();
    c4DeviceControllerDict.import_json(filename);
    var fileController = controller.newFromDict(c4DeviceControllerDict);
    var controllerDictStr = fileController.toJsonStr();
    var maxDictStr = JSON.stringify(JSON.parse(c4DeviceControllerDict.stringify()));
    if (!reqModule.compareLoadData(controllerDictStr, maxDictStr)) {
        post("C4Device.loadCurrentControllerDictFromFile(): assumption issue, js controller object and Max js Dict object don't have the same JSON data after load"); post();
        var end = filename.toString().lastIndexOf(".");
        var ext = filename.toString().substring(end);
        var path = filename.toString().substring(0, end);
        var newFilename = path + "_jsControllerLoadData" + ext;
        //post("C4Device.loadCurrentControllerDictFromFile(): constructed mismatched filename:",newFilename);post();
        var d = new Dict("badLoadCompare");
        d.parse(controllerDictStr);
        //post("C4Device.loadCurrentControllerDictFromFile(): saving failed-load JS executive Object to file:", filename);post();
        d.export_json(newFilename);
    } else {
        // only make the loaded file "active" if the data loaded correctly
        fileController.copyActiveSignals();
        controller = fileController;
        currentDeckName = controller.determineSavedOnDutyDeckName();
        controller.refreshDeckForDutySwap(currentDeckName);
        setActiveCrewOnDuty(currentDeckName);
        // "clearing the last step" here is a euphemism for updating the C4 display with data just loaded from disk
        clearLastSequencerStep(1);
    }
}

function initButtons(modeSelect){
    buttonsDict.name = "c4Buttons";
    btnStateDict.name = "buttonStateChangeCount";
    ledStateDict.name = "ledStateChangeCount";
    var bridgeButtons = controller["bridgeDeck"].brdgButtons;
    for(var i = 0; i < TOTAL_BUTTONS; i++) {
        var button = bridgeButtons[i];
        if (button.index === PROCESSING_BYPASS_SIGNAL_ID && modeSelect === 127) {
            // initialize in "processing mode"
            button.pressedCount += 1;
            button.releasedCount += 1;
            button.ledChangeCount += 1;
            button.ledValue = 127; // ON === processing events by default
        }
        controller["bridgeDeck"].brdgButtons[button.index] = button;
        buttonsDict.setparse(button.index, button.toJsonStr());// save initial state to dicts
        var buttonJson = buttonsDict.get(i);
        button = utilButton.newFromDict(buttonJson);
        btnStateDict.set(i, button.pressedCount + button.releasedCount);
        ledStateDict.set(i, button.ledChangeCount);
    }
    // save the default signals (specifically "button 22" - PROCESSING ON) to all decks of the "global" controller
    controller.propagateActiveSpareSignalsAcrossDecks()
}

// Max's console doesn't post() the correct Dict values above or below, but they're correct
function initEncoders() {
    encodersDict.name = "c4Encoders";
    encBtnReleasedStateDict.name = "encoderBtnReleasedData";
    encBtnPressedStateDict.name = "encoderBtnPressedData";
    var bridgeEncoders = controller["bridgeDeck"].brdgEncoders;
    for(var i = 0; i < TOTAL_ENCODERS; i++) {
        var encoder = bridgeEncoders[i];
        encodersDict.setparse(i, encoder.toJsonStr());
        var encoderJson = encodersDict.get(i);
        encoder = utilEncoder.newFromDict(encoderJson);
        encBtnReleasedStateDict.set(i, encoder.releasedValue);
        encBtnPressedStateDict.set(i, encoder.pressedValue);
    }
}

function midievent(midiMsgIn) {
    encodersDict.name = "c4Encoders";
    buttonsDict.name = "c4Buttons";

    var MIDI_MSG_SIZE = 3;
    var midiMsg = arrayfromargs(arguments);
    var size = midiMsg.length;
    if (size > MIDI_MSG_SIZE - 1) {
        var feedbackMsg = [midiMsg[0], midiMsg[1], midiMsg[2], 0];
        var pageChangeSignal = 0;
        var btnDict = buttonsDict.get(PROCESSING_BYPASS_SIGNAL_ID);
        var bypassBtn = utilButton.newFromDict(btnDict);
        if (size === MIDI_MSG_SIZE) {
            //post("C4Device.midievent: Processing is: ");
            if (!bypassBtn.isBypassed()) {
                //post("enabled", midiMsg);post();
                if (midiMsg[0] === MIDI_NOTE_ON_ID || midiMsg[0] === MIDI_NOTE_OFF_ID) {
                    if (midiMsg[1] === bypassBtn.index) {
                        //post("C4Device.midievent: Processing Status change event received while processing", midiMsg);post();
                    }
                    feedbackMsg = processButtonMessage(midiMsg);
                    var lstBtnIdx = EXTERNAL_TRANSPORT_STATUS_SIGNAL_ID;// actually "one past" so < works properly
                    if (!(feedbackMsg[1] < ENCODER_BTN_OFFSET)) {
                        // encoder button feedback
                        feedbackMsg[0] = MIDI_CC_ID;
                        var encoderId = (feedbackMsg[1] - ENCODER_BTN_OFFSET) + reqModule.getPageOffset();
                        var encDict = encodersDict.get(encoderId);
                        var encoder = utilEncoder.newFromDict(encDict);
                        feedbackMsg[2] = encoder.getFeedbackValueForRingStyle();
                    } else if (feedbackMsg[1] < 3 && midiMsg[2] === BUTTON_RELEASED_VALUE) {
                        // Split button "released" feedback.
                        var encoderPageOffset = reqModule.getPageOffset();
                        // post("C4Device.midievent: did the encoder-feedback-display page change?");
                        if (lastEncoderPageOffset !== encoderPageOffset) {
                            // post("YES, offset", lastEncoderPageOffset, "going to", encoderPageOffset);post();
                            lastEncoderPageOffset = encoderPageOffset;
                            pageChangeSignal = 1;
                        } else {
                            // post("NO, offset", lastEncoderPageOffset, "remaining", encoderPageOffset);post();
                        }
                    } else if (feedbackMsg[1] >= 5 && feedbackMsg[1] <= 8 && midiMsg[2] === BUTTON_RELEASED_VALUE) {
                        // (Assignment) Button "released" feedback
                        // Reassign which "controller deck crew" is "on duty"
                        swapActiveCrewsOnDuty(feedbackMsg[1]);
                        // and set the stage the way they left it
                        lastEncoderPageOffset = reqModule.getPageOffset();
                        pageChangeSignal = 1;
                    } else if (feedbackMsg[1] >= 9 && feedbackMsg[1] <= 12 && midiMsg[2] === BUTTON_RELEASED_VALUE) {
                        // (Parameter) Bank Left, Bank Right; Single Left or Single Right Button "released" feedback
                        // Transform "encoder book" dict data by rotation
                        // wrapping % 128 so 00 - 08 == 120
                        transformEncoderBookData(feedbackMsg[1]);
                        pageChangeSignal = 1;
                    } else if (feedbackMsg[1] > 16 && feedbackMsg[1] < lstBtnIdx && midiMsg[2] === BUTTON_RELEASED_VALUE) {
                        // (Session) Slot Up, or Down; Track Left or Right Button "released" feedback
                        // Transform "encoder page" dict data by rotation
                        // wrapping % 32 so 00 - 08 == 24
                        transformEncoderPageData(feedbackMsg[1]);
                        pageChangeSignal = 1;
                    }
                    // pass all other button feedback messages
                } else if (midiMsg[0] === MIDI_CC_ID && midiMsg[1] < NBR_PHYSICAL_ENCODERS) {
                    feedbackMsg = processEncoderMessage(midiMsg);
                } else {
                    // true here: Processing enabled and (midiMsg[0] === MIDI_CC_ID && midiMsg[1] >= NBR_PHYSICAL_ENCODERS)
                    // Live directly updates mapped parameter objects in the remote script when for example, the selected track changes,
                    // those updates include sending CC feedback messages to update the C4 display
                    // (directly from Live, not via any accessible remote script "send midi" methods?)
                    // This patch is dropping that feedback here because the script is in USER mode and this patch is charge of the C4 display right now.
                    //post("C4Device.midievent: CC feedback netted while processing:", midiMsg.toString());post();
                    feedbackMsg = [0, 0, 0, 0];
                    return;
                    //outlet(0, midiMsg);
                }
            } else { // bypassBtn.isBypassed()
                //post("bypassed");post();
                // check for Stop bypassing signal
                if (midiMsg[1] === bypassBtn.index) {
                    //post("C4Device.midievent: Processing Status change event received while bypassed", midiMsg);post();
                    feedbackMsg = processButtonMessage(midiMsg);
                } else {
                    // Note or CC feedback message from remote script passing thru
                    //post("C4Device.midievent:", midiMsg.toString());
                    outlet(0, midiMsg);
                    return;
                }
            }
        } else { // size > MIDI_MSG_SIZE is a SYSEX
            // (NEVER HAPPENS, Max midiin objects don't pass sysex, need sysexin object)
            post("C4Device.midievent: Processing is bypassed: <", bypassBtn.isBypassed(), ">");
            post();
            post(midiMsg.toString()[0]);
            outlet(1, midiMsg);
        }

        if (!bypassBtn.isBypassed()) {
            // if the output matches the input as expected, return the midi feedback msg to Max (to the C4)
            if (feedbackMsg[3] === midiMsg[2] || feedbackMsg[3] === (ENCODER_RING_BTN_LED_ON_OFFSET - midiMsg[2])) {

                outlet(0, [feedbackMsg[0], feedbackMsg[1], feedbackMsg[2]]);
                // if there are any more feedback messages, return them next
                // if the sequencer is running and the page changes, defer sysex feedback to sequencer control
                // only send this "display page update" if the sequencer is not running when the page changes
                if (pageChangeSignal > 0 && !isSequencerRunning()) {
                    sendEncoderPageData(generateDisplayPageChangeMsgs);
                } else if (midiMsg[0] === MIDI_CC_ID && !isSequencerRunning()) {
                    var lcdFdbkMsg = generateLcdFeedback(midiMsg[1]);
                    // only send if content changed
                    if (lcdFdbkMsg[0][0] !== ABORT_FEEDBACK_SIGNAL) {
                        outlet(1, lcdFdbkMsg[0]);//top line
                    }
                    if (lcdFdbkMsg[1][0] !== ABORT_FEEDBACK_SIGNAL) {
                        outlet(1, lcdFdbkMsg[1]);//bottom line
                    }
                }
            }
            else if (feedbackMsg[1] === bypassBtn.index) {
                // dropping because "button 22" is virtual, no physical LED.  Dictionary data is already updated
                // post("C4Device.midievent: 'mode change' signal feedback netted while actively processing:",feedbackMsg.toString());
            } else if (feedbackMsg[0] === MIDI_CC_ID && feedbackMsg[1] >= NBR_PHYSICAL_ENCODERS) {
                // this seems to hit after the remote script leaves USER mode, the script is already sending these CCs
                // post("C4Device.midievent: feedback netted:",feedbackMsg.toString());post();
                // outlet(0, [midiMsg[0], midiMsg[1], midiMsg[2]]);
            } else if (feedbackMsg[0] === 0 && feedbackMsg[1] === 0 && feedbackMsg[2] === 0 && feedbackMsg[3] === 0) {
                post("C4Device.midievent: dropping unprocessed feedback msg result", feedbackMsg.toString());
                post();
            } else {
                post("C4Device.midievent: unexpected event processing result", feedbackMsg.toString());
                post();
            }
        }
        // bypassBtn.isBypassed() &&
        else if (feedbackMsg[1] === bypassBtn.index) {
            // local event processing is bypassed
            // dropping virtual button, no physical LED, no feedback
            // post("C4Device.midievent: 'mode change' signal feedback netted while processing bypassed", feedbackMsg.toString());
            // post();
        } else if (midiMsg[1] >= NBR_PHYSICAL_ENCODERS) {
            // local event processing is bypassed
            post("C4Device.midievent: CC feedback netted, forwarding:", midiMsg.toString(), feedbackMsg.toString());post();
            outlet(0, [midiMsg[0], midiMsg[1], midiMsg[2]]);
        } else if (midiMsg[0] === MIDI_NOTE_ON_ID || midiMsg[0] === MIDI_NOTE_OFF_ID) {
            // local event processing is bypassed
            post("C4Device.midievent: Note feedback netted, forwarding:", midiMsg.toString(), feedbackMsg.toString());post();
            outlet(0, [midiMsg[0], midiMsg[1], midiMsg[2]]);
        } else {
            post("C4Device.midievent: processing bypassed, dropping event:", midiMsg.toString(), feedbackMsg.toString());
            post();
        }
    } else {
        post("C4Device.midievent: too small for a 3 byte midi message", arguments);
        post();
    }
}

var sysexMsg = [];
function midiSysexEvent(byteVal) {
    buttonsDict.name = "c4Buttons";
    var ledVal = buttonsDict.get(PROCESSING_BYPASS_SIGNAL_ID + "::ledValue");
    if (ledVal === 0) {
        if (byteVal === 240) {
            sysexMsg = [byteVal];// resets the array to size 1
        } else if (byteVal === 247) {
            sysexMsg.push(byteVal);
            // sysex messages only originate on the C4 in specific circumstances like power up and as responses to sysex requests like version info
            // and would only end up here if they passed thru the remote script first (when the script is in USER mode**) or came from Live directly
            // but the remote script isn't coded in a way that allows Live to send sysex "display updates" directly.  The script still uses the old
            // school on_display_update_timer() event to write sysex which is disabled in USER mode
            // TLDR: this patch is only processing 1 sysex message, for defensive purposes, the C4 (power up / reset) welcome message
            // all other SYSEX messages are simply forwarded.  (this data is the device serial number or firmware version string)
            var c4Welcome = [240, 0, 0, 102, 23, 1, 90, 84, 49, 48, 52, 55, 51, 121, 16, 6, 0, 247]
            if (isPatchProcessingEnabled()) {
                var isMatch = true;
                for (var i in c4Welcome) {
                    if (i < 6 && sysexMsg[i] !== c4Welcome[i]) {
                        isMatch = false;
                    } else if (i > c4Welcome.length - 4 && sysexMsg[i] !== c4Welcome[i]) {
                        isMatch = false;
                    }
                }
                // The C4 "blanks out" the display (LEDs and LCDs) when it sends what was just received
                // so here, "unblank" the display right back
                if (isMatch) {
                    post("C4Device.midiSysexEvent: matching sysex msg in processing mode, refreshing display", sysexMsg); post();
                    sendEncoderPageData(generateDisplayPageChangeMsgs);
                } else {
                    post("C4Device.midiSysexEvent: unexpected sysex msg in processing mode, dropping", sysexMsg); post();
                }
            } else {
                outlet(1, sysexMsg);
            }
        }  else {
            sysexMsg.push(byteVal);
        }
    } else {
        // ** remote script is in USER mode when this patch is processing midi events (ledValue === 127)
        // this is where any sysex this patch might want to handle gets dropped/ignored
        // normally this patch ignores/drops all incoming sysex messages
        sysexMsg = [];
    }
}

var currentDeckName = "bridgeDeck";
// There are 5 decks to the controller, but only one of the decks is "on duty" at a time
// When swapping the "on duty" deck crew, save the current "duty log" data (from the "active" Dicts) back to both
// the controller js-object and the backing C4DeviceExecutiveController Max js-Dict-object,
// then update the "duty log" (the "active" Dicts) with "new" saved data from the controller (associated with the next
// "on duty" deck crew).
//
// Note: The "Assignment group" Button associated with the buttonId input parameter data has already been updated
// across all decks (because it's common data). Here, we are ONLY swapping data in and out of the "active" Dicts
// to reflect the deck change.
//
// Note 2: "theCurrentSplitButtonLED" and "splitFeedbackAddressChangeCount" are declared in C4Button.js which
// is included here in C4Device.js, so they are "visible" here too.
// only other assignments to these "js-object instance" variables is in C4Button.processSplitEvent(v)
//
// If Max Transport is selected, the running status of the sequencer might "automatically" change with any crew change
function swapActiveCrewsOnDuty(buttonId) {
    //c4DeviceControllerDict.name = "C4DeviceExecutiveController";
    buttonsDict.name = "c4Buttons";
    encodersDict.name = "c4Encoders";
    if (buttonId >= 5 && buttonId <= 8) {
        var nextDeckName = reqModule.getActiveControllerDeckName();// depends on which assignment leds are ON in exec Dict
        var deckChange = currentDeckName !== nextDeckName;
        if (deckChange) {
            saveActiveDeck(currentDeckName);
            activateSavedDeck(nextDeckName);
            currentDeckName = nextDeckName;
            // setActiveCrewOnDuty(nextDeckName);
        } else {
            // changes to Assignment buttonId LEDs (5-8) only trigger "on duty" roster changes in hierarchical order
            // Marker deck has the highest precedence, and Bridge deck has lowest.
            // Marker deck is always "On Duty" when the Marker LED is ON
            // Bridge deck is only "On Duty" when no Assignment LEDs are ON
            // Functn deck is only "On Duty" when the Function LED is the ONLY Assignment LED ON.
            // Execution passes through here when lower precedence Assignment button LEDs change state
            // while a higher precedence Assignment button LED is ON (so no "deck on duty" change)
        }
    } else {
        post("C4Device.swapActiveCrewsOnDuty: assumption issue, function called for non-Assignment button", buttonId, currentDeckName, nextDeckName); post();
    }
}

function updateActiveControllerDeckForSave(activeDeckName) {
    saveActiveDeck(activeDeckName);
}

// Save the "actively changing Dict memory" to the "relatively stable Dict memory"
// curDeckCtrlBtn.copyDataFrom(activeBtn);
// replaces old "saved" data (if any) in JS Controller with new "active data" from "active Max Dicts" (buttons, encoders, press counts, led change counts)
// curDeckCtrlBtn.updateNamedDict("C4DeviceExecutiveController", replaceKey);
// replaces old "saved" data in Max Dict Executive Controller with new "active data" (just copied from) from "active Max Dicts"
// "deck officers" like officer "Split button" are not "active" in the same way, but still need addressing for storage.
//
// Every deck has three "Split button feedback addresses" corresponding to the three associated Split button leds (1/3, 2/3, 3/3) and a fourth "all leds OFF" state 0/3).
// The one actual Split button always sends the same two pressed and released midi messages from address 0, which is also the first "feedback address".  So determining the
// correct "feedback response" midi message to return (which led should turn ON or OFF) is the responsibility of the "Split button" squad, three grunts and an officer.
//
// The three split button grunts keep track of their corresponding button-led status like "normal buttons", but they need to coordinate with their deck officer who is always
// on duty when the deck is on duty counting the number of times the physical Split button is pressed+released which determines the led ON rotation cycle for the deck.
//
// "feedback address change count" should be recoverable from stored data? by  (13.ledChangeCount + 23.ledChangeCount + 33.ledChangeCount) %2 but that doesn't tell you which led
// should be ON, only that all should be OFF when the modulo is zero. More specifically that modulo operation is distributed, (13.ledChangeCount % 2) + (23.ledChangeCount % 2) + (33.ledChangeCount % 2)
// where each zero means that led is OFF and each 1 means that led is ON (and should never have more than one ON at a time)
//
//
// Every deck also has four "Assignment buttons" that function in a similar manner (but controller wide across all decks), defining five states of the four button leds (0/4, 1/4, 2/4, 3/4, 4/4)
// or (bridge, Marker, ChanSt, Track, Funct).  The difference is every Assignment led has a corresponding button.
// The three split leds could be used to track 8 "display pages" on each deck instead of 4 by turning ON in an octal (3 bit) sequence: 000, 001, 010, 011, 100, 101, 110, 111  instead of the
// "biased" cycle of 4 "display pages" (0, 1, 0, 2, 0, 3)
// this C4Device object uses the "controller" (both JS object and Max Dict forms) to keep everything organized and running correctly
function saveActiveDeck(deckName) {
    c4DeviceControllerDict.name = "C4DeviceExecutiveController";
    buttonsDict.name = "c4Buttons";
    encodersDict.name = "c4Encoders";
    var reqName = reqModule.getActiveControllerDeckName();
    if (deckName !== reqName) {// these only match when the user "saves a sequencer file" in the Max patch
        //post("C4Device.saveActiveDeck: input deck", deckName, "is not active deck", reqName, "saving active data to input deck for duty swap"); post();
    } else {
        post("C4Device.saveActiveDeck: input deck", deckName, "is the active deck, saving active data to input deck for save to file"); post();
    }

    // propagate "common" data from this deck across all decks (and make sure the two controller Split button officers match)
    controller.refreshDeckForDutySwap(deckName);

    var deckSplitName = controller.getCrewNameForDeck(deckName, "Split");
    var deckSplitKey = controller.getCrewReplaceKeyForDeck(deckName, "Split");
    theCurrentSplitButtonLED.ledChangeCount = splitFeedbackAddressChangeCount;
    controller[deckName][deckSplitName].copyDataFrom(theCurrentSplitButtonLED);
    controller[deckName][deckSplitName].updateNamedDict("C4DeviceExecutiveController", deckSplitKey);


    var deckBtnCrew = controller.getCrewNameForDeck(deckName, "Buttons");
    var deckEncCrew = controller.getCrewNameForDeck(deckName, "Encoders");
    var deckButtons = controller[deckName][deckBtnCrew];
    var deckEncoders = controller[deckName][deckEncCrew];
    for(var i = 0; i < TOTAL_BUTTONS; i++) {
        var replaceKey = controller.getCrewReplaceKeyForDeck(deckName, "Buttons");
        // get the active "on duty" data from the "active (buttons and encoders) Dicts"
        var activeBtnDict = buttonsDict.get(i);
        var activeBtn = utilButton.newFromDict(activeBtnDict);

        var curDeckCtrlBtn = deckButtons[i];
        curDeckCtrlBtn.copyDataFrom(activeBtn);
        // store the active "on duty" data to the Max Exec controller for later
        curDeckCtrlBtn.updateNamedDict("C4DeviceExecutiveController", replaceKey);
        // store the active "on duty" data to the JS controller object for later
        deckButtons[i] = curDeckCtrlBtn;

        // repeat for encoders (encoder 0 and button 0 are not related)
        if (i < TOTAL_ENCODERS) {// (encoder CC 0 has encoder-button Note 32 and both have "feedback address" CC 32)
            replaceKey = controller.getCrewReplaceKeyForDeck(deckName, "Encoders");
            var activeEncDict = encodersDict.get(i);
            var activeEnc = utilEncoder.newFromDict(activeEncDict);
            var curDeckCtrlEnc = deckEncoders[i];
            curDeckCtrlEnc.copyDataFrom(activeEnc);
            curDeckCtrlEnc.updateNamedDict("C4DeviceExecutiveController", replaceKey);
            deckEncoders[i] = curDeckCtrlEnc;
        }
    }
}

function activateSavedDeck(deckName) {
    c4DeviceControllerDict.name = "C4DeviceExecutiveController";
    buttonsDict.name = "c4Buttons";
    encodersDict.name = "c4Encoders";
    var reqName = reqModule.getActiveControllerDeckName();
    if (deckName !== reqName) {
        post("C4Device.activateSavedDeck: input deck", deckName, "is not active deck", reqName, "restoring saved data from input deck to active duty for loading from file"); post();
    } else {
        //post("C4Device.activateSavedDeck: input deck", deckName, "is the active deck, restoring saved data from input deck to active duty for regular duty swap"); post();
    }

    controller.refreshDeckForDutySwap(deckName);

    var deckSplitName = controller.getCrewNameForDeck(deckName, "Split");

    theCurrentSplitButtonLED.copyDataFrom(controller[deckName][deckSplitName]);
    splitFeedbackAddressChangeCount = theCurrentSplitButtonLED.ledChangeCount;


    var deckSplitKey = controller.getCrewReplaceKeyForDeck(deckName, "Split");
    var execContDict = c4DeviceControllerDict.get(deckSplitKey);
    var execSplitBtn = utilButton.newFromDict(execContDict);
    if (!reqModule.compareSaveData(controller[deckName][deckSplitName], execSplitBtn)) {
        post("C4Device.activateSavedDeck: assumption issue, sources don't agree on deck officer Split button data", deckName, reqName); post();
        execSplitBtn.copyDataFrom(controller[deckName][deckSplitName]);
        execSplitBtn.updateNamedDict("C4DeviceExecutiveController", deckSplitKey);
    }


    var deckBtnCrew = controller.getCrewNameForDeck(deckName, "Buttons");
    var deckEncCrew = controller.getCrewNameForDeck(deckName, "Encoders");
    var deckButtons = controller[deckName][deckBtnCrew];
    var deckEncoders = controller[deckName][deckEncCrew];
    for(var i = 0; i < TOTAL_BUTTONS; i++) {

        deckButtons[i].updateActiveDicts();
        if (i < TOTAL_ENCODERS) {
            deckEncoders[i].updateActiveDicts();
        }
    }
}

// this method does two things at once, accomplishing a swap,
// 1. saves the data in the "active Dicts" to the current controller deck's Dicts
// 2. replaces the data in the "active Dicts" with data from the next controller deck's Dicts
// saveActiveDeck() and activateSavedDeck() do the same two things separately, this method is likely deprecated
function setActiveCrewOnDuty(nextDeckName) {
    c4DeviceControllerDict.name = "C4DeviceExecutiveController";
    buttonsDict.name = "c4Buttons";
    encodersDict.name = "c4Encoders";
    // For normal button events, the Reference Dict was already updated, see comments above swapActiveCrewsOnDuty(buttonId)
    // For loading a saved file, the Reference Dict was already updated with the imported data
    // For saving a loaded file, don't call this method (see updateActiveControllerDeckForSave() above)
    controller.copyActiveSignals();// signal button (21 - 31) data of "active deck" copied to all decks
    controller.updateActiveDeckSplit(currentDeckName, theCurrentSplitButtonLED)
    var reqName = reqModule.getActiveControllerDeckName();
    // post("C4Device.setActiveCrewOnDuty: input deck name:", nextDeckName); post();
    // post("C4Device.setActiveCrewOnDuty: exec active deck name:", reqName); post();
    if (nextDeckName !== reqName) {
        post("C4Device.setActiveCrewOnDuty: assumption issue, sources don't agree on next deck name", nextDeckName, reqName); post();
    }

    var curBtnCrew = controller.getCrewNameForDeck(currentDeckName, "Buttons");
    var curEncCrew = controller.getCrewNameForDeck(currentDeckName, "Encoders");
    var curDeckButtons = controller[currentDeckName][curBtnCrew];
    var curDeckEncoders = controller[currentDeckName][curEncCrew];

    controller.refreshDeckForDutySwap(nextDeckName);
    var nextDeckSplitName = controller.getCrewNameForDeck(nextDeckName, "Split");
    var deckSplitKey = controller.getCrewReplaceKeyForDeck(nextDeckName, "Split");

    theCurrentSplitButtonLED.copyDataFrom(controller[nextDeckName][nextDeckSplitName]);
    controller[nextDeckName][nextDeckSplitName].updateNamedDict("C4DeviceExecutiveController", deckSplitKey);// preparing for possible save before next deck crew swap
    splitFeedbackAddressChangeCount = theCurrentSplitButtonLED.ledChangeCount;

    var nexBtnCrew = controller.getCrewNameForDeck(nextDeckName, "Buttons");
    var nexEncCrew = controller.getCrewNameForDeck(nextDeckName, "Encoders");
    var nexDeckButtons = controller[nextDeckName][nexBtnCrew];
    var nexDeckEncoders = controller[nextDeckName][nexEncCrew];

    for(var i = 0; i < TOTAL_BUTTONS; i++) {

        // store the "on duty" data of the deck going "off duty" for the deck's next "on duty" shift
        var curDeckCtrlBtn = curDeckButtons[i];
        var activeBtnDict = buttonsDict.get(i);
        var activeBtn = utilButton.newFromDict(activeBtnDict);
        curDeckCtrlBtn.copyDataFrom(activeBtn);

        var replaceKey = controller.getCrewReplaceKeyForDeck(currentDeckName, "Buttons");
        curDeckCtrlBtn.updateNamedDict("C4DeviceExecutiveController", replaceKey);
        curDeckButtons[i].copyDataFrom(curDeckCtrlBtn);
        //post("C4Device.setActiveCrewOnDuty: c:",curDeckCtrlBtn.toJsonStr()); post();

        // pull the previous "on duty" data of the deck going (back) "on duty" for this shift
        // and refresh the active Dicts with the updated info
        nexDeckButtons[i].updateActiveDicts();
        //post("C4Device.setActiveCrewOnDuty: n:", nexDeckButtons[i].toJsonStr()); post();

        // repeat for encoders
        if (i < TOTAL_ENCODERS) {
            var curDeckCtrlEnc = curDeckEncoders[i];
            var activeEncDict =  encodersDict.get(i);
            var activeEnc = utilEncoder.newFromDict(activeEncDict);
            curDeckCtrlEnc.copyDataFrom(activeEnc);

            replaceKey = controller.getCrewReplaceKeyForDeck(currentDeckName, "Encoders");
            curDeckCtrlEnc.updateNamedDict("C4DeviceExecutiveController", replaceKey);
            curDeckEncoders[i].copyDataFrom(curDeckCtrlEnc);

            nexDeckEncoders[i].updateActiveDicts();
        }
    }
    currentDeckName = nextDeckName;
}


function sendEncoderPageData(encoderPageDataCallback) {

    var rtn = encoderPageDataCallback();
    if (!isPatchProcessingEnabled()) {
        post("C4Device.sendEncoderPageData: processing bypassed");post();
        return;
    }

    var MILLIS_OF_LATENCY_BETWEEN_SYSEX = 5;
    if (rtn.length < 5) {
        post("C4Device.sendEncoderPageData: unexpected display processing result", rtn.toString());post();
    } else {
        for (var i = 0; i < rtn.length; i++) {
            if (i === 0 || i === 5) {
                outlet(0, rtn[i]);
            } else {
                outlet(1, rtn[i]);
            }
            // delay next iteration 5 millis, say, (blocking cpu) 20 millis total delay latency "between"
            // arrays of midi messages sent to the outlet (rtn[0] contains all 32 "ring feedback" cc messages)
            // this hack slows down the midi data flow to the C4
            // so its hardware buffers can handle the volume of data from Max.
            // If we assume the processDisplayChange() function runs in less than 13 millis with a few to spare,
            // then we could theoretically "display" about 30 "pages" per second ((20 + 13) * 3 * 10 === 990)
            // on the C4 including this hacked latency.  However, 10 "pages" per second is probably a more than
            // adequate practical maximum "refresh rate".
            // (at the cost of "blocking cpu" 20 millis per page, 5 millis per iteration)
            // (humans can't physically trigger the "Split" button (led on/off) 10 times per second, can they?)
            var date = new Date();
            var curDate = null;
            do {
                curDate = new Date();
            }
            while (curDate - date < MILLIS_OF_LATENCY_BETWEEN_SYSEX);
        }
    }
}

function processButtonMessage(midiNoteMsg) {
    buttonsDict.name = "c4Buttons";
    if (midiNoteMsg.length === 3) {
        var feedbackRtn = [MIDI_NOTE_ON_ID, midiNoteMsg[1],midiNoteMsg[2], 0];
        var btnDict = buttonsDict.get(midiNoteMsg[1]);
        var c4Button = utilButton.newFromDict(btnDict);
        var rtn = c4Button.processEvent(midiNoteMsg[2]);
        if (midiNoteMsg[1] !== rtn[0]) {
            if (midiNoteMsg[1] === 0 && rtn[0] < 3) {
                // pass this expected Split button feedback address mismatch silently
            } else {
                post("C4Device.processButtonMessage: Note number feedback address mismatch", midiNoteMsg.toString(), rtn.toString());post();
            }
        }
        //feedbackRtn[0] = midiNoteMsg[0]; MIDI_NOTE_ON_ID (144)
        // the (last updated) feedback "Note ID" value (no encoder page offset, yes split button alias)
        feedbackRtn[1] = rtn[0];
        // the (last updated) feedback "Note Velocity" value (button led on/off state (0 or 127))
        feedbackRtn[2] = rtn[1];
        // the "raw" Note value (0 === button was released, 127 === button was pressed)
        feedbackRtn[3] = rtn[2];
        // first 3 returned indexes make the midi feedback message, 4th input-pass-through is for assumption verification
        return feedbackRtn;
    } else {
        post("C4Device.processButtonMessage: not a 3 arg midi Note message", arguments);post();
        return [0, 0, 0, 0];
    }
}

function processEncoderMessage(midiCCMsg) {
    encodersDict.name = "c4Encoders";
    var size = midiCCMsg.length;
    if (size === 3) {
        var feedbackRtn = [midiCCMsg[0], midiCCMsg[1], midiCCMsg[2], 0];
        var encDict = encodersDict.get(midiCCMsg[1] + reqModule.getPageOffset());
        var c4Encoder = utilEncoder.newFromDict(encDict);
        var rtn = c4Encoder.processIncrement(midiCCMsg[2]);
        if (midiCCMsg[1] + ENCODER_BTN_OFFSET !== rtn[0]) {
            post("C4Device.processEncoderMessage: CC number feedback address mismatch", midiCCMsg.toString(), rtn.toString());post();
        }
        //feedbackRtn[0] = midiCCMsg[0];// MIDI_CC_ID (176)
        feedbackRtn[1] = rtn[0];// the last updated "encoder Key" (no page offset) feedback address
        feedbackRtn[2] = rtn[1];// the last updated stored Dict value (0 to 127 range by default)(scaled for led ring)
        feedbackRtn[3] = rtn[2];// the "normalized" CC increment value (negative for counter-clockwise input values)

        return feedbackRtn;// first 3 indexes make the midi feedback message, 4th index is "error checking"
    } else {
        post("C4Device.processEncoderMessage: not a 3 arg midi CC message", arguments);post();
        return [0, 0, 0, 0];
    }
}

// transformEncoderPageData works on one "display page" at a time, the current display page.
// The wrapping point is the page boundary, the number of physical encoders.
function transformEncoderPageData(buttonId) {
    var rotateBy = 0;
    var encoderPageOffset = reqModule.getPageOffset();
    switch (buttonId) {
        case 17: rotateBy = -ENCODERS_PER_LCD_SCREEN; break;// Slot Up button
        case 18: rotateBy = ENCODERS_PER_LCD_SCREEN; break;// Slot Down button
        case 19: rotateBy = -1; break;// Track Left button
        case 20: rotateBy = 1; break;// Track Right button
    }
    if (rotateBy === 0) {
        post("C4Device.transformEncoderPageData: unexpected buttonId input", buttonId, "no data transformation"); post();
        return;
    }
    transformEncoderData(encoderPageOffset, NBR_PHYSICAL_ENCODERS, rotateBy);
}

// transformEncoderBookData works on the whole book of "display pages" at a time.
// The wrapping point is the book length, the number of "display pages" modeled.
function transformEncoderBookData(buttonId) {
    var rotateBy = 0;
    var encoderPageOffset = 0;
    switch (buttonId) {
        case 9: rotateBy = -NBR_PHYSICAL_ENCODERS; break;// Bank Left button
        case 10: rotateBy = NBR_PHYSICAL_ENCODERS; break;// Bank Right button
        case 11: rotateBy = -ENCODERS_PER_LCD_SCREEN; break;// Single Left button
        case 12: rotateBy = ENCODERS_PER_LCD_SCREEN; break;// Single Right button
    }
    if (rotateBy === 0) {
        post("C4Device.transformEncoderBookData: unexpected buttonId input", buttonId);post();
        return;
    }
    transformEncoderData(encoderPageOffset, TOTAL_ENCODERS, rotateBy);
}

function transformEncoderData(encoderPageOffset, wrapBoundary, rotateBy) {
    buttonsDict.name = "c4Buttons";
    encodersDict.name = "c4Encoders";
    var dataBefore = [];
    var dataAfter = [];
    for (var i = encoderPageOffset; i < (encoderPageOffset + wrapBoundary); i++) {
        var encDict = encodersDict.get(i);
        var beforeEnc = utilEncoder.newFromDict(encDict);
        var btnDict = buttonsDict.get(i + ENCODER_BTN_OFFSET);
        var beforeBtn = utilButton.newFromDict(btnDict);
        dataBefore.push([beforeEnc, beforeBtn]);
        var j = i + rotateBy;
        j = j < encoderPageOffset ? j + wrapBoundary : j;
        j = j >= (encoderPageOffset + wrapBoundary) ? j - wrapBoundary : j;
        encDict = encodersDict.get(j);
        var afterEnc = utilEncoder.newFromDict(encDict);
        btnDict = buttonsDict.get(j + ENCODER_BTN_OFFSET);
        var afterBtn = utilButton.newFromDict(btnDict);
        dataAfter.push([afterEnc, afterBtn]);
    }
    for (i = 0; i < wrapBoundary; i++) {
        var before = dataBefore[i];
        var after = dataAfter[i];
        after[0].copyDataFrom(before[0]);
        after[1].copyDataFrom(before[1]);
        after[0].updateActiveDicts();// encoders
        after[1].updateActiveDicts();// encoder buttons
    }
}

function isSequencerRunning() {
    buttonsDict.name = "c4Buttons";
    var isProcessingMode = isPatchProcessingEnabled()
    // Note ID 21 is a logically spare button element (doesn't physically exist on the C4) being used
    // to globally signal (from Max to javascript via dict data) the state of the patch's "external transport"
    var btnDict = buttonsDict.get("21");
    var isExternalSyncSelected = btnDict.get("ledValue") === BUTTON_LED_ON_VALUE;
    if (isExternalSyncSelected) {
        var isExternalTransportRunning = btnDict.get("pressedValue") === BUTTON_PRESSED_VALUE;
        if (isExternalTransportRunning) {
            //?isExternalTransportRunning = !(buttonsDict.get("4::ledValue") === BUTTON_PRESSED_VALUE);// ON === IGNORE external transport running
        }
        return isExternalTransportRunning;
    }
    // Note ID 4 === Spot Erase button === Internal Sequencer Start/Stop  LED ON === Internal Transport Running (opposite above)
    var isInternalTransportRunning = buttonsDict.get("4::ledValue");
    return isInternalTransportRunning;
}
function isSequencerVerbose() {
    buttonsDict.name = "c4Buttons";
    var isProcessingMode = isPatchProcessingEnabled()
    // Note ID 23 is a logically spare button element (doesn't physically exist on the C4) being used
    // to globally signal (from Max to javascript via dict data) the state of the patch's "verbose override"
    var btnDict = buttonsDict.get("23");
    var isVerboseModeSelected = btnDict.get("pressedValue") === BUTTON_PRESSED_VALUE;
    return isProcessingMode || isVerboseModeSelected;
}
function isPatchProcessingEnabled() {
    buttonsDict.name = "c4Buttons";
    var signalKey = PROCESSING_BYPASS_SIGNAL_ID + "::ledValue";
    var signalValue = buttonsDict.get(signalKey);
    // ledValue: ON == Processing events (feedback mode), OFF == Bypassing Event Processing (passthru mode)
    return signalValue === BUTTON_LED_ON_VALUE;
}

function generateLcdFeedback(encoderId) {

    if (!isPatchProcessingEnabled()) {
        return;
    }

    // encoderId should be "raw midi CC" sender (00 - 31)
    encodersDict.name = "c4Encoders";
    encIndexesByLcdRowDict.name = "lcdScreenRowIndexRef";
    var encoderPageOffset = reqModule.getPageOffset();

    var encoderDisplayRefRow = 0;// because ~~0/8 === 0.00?
    if (encoderPageOffset > 0) {
        // 32/8 == RowIndex 4, 64/8 == RowIndex 8, 96/8 == RowIndex 12
        encoderDisplayRefRow = ~~(encoderPageOffset / ENCODERS_PER_LCD_SCREEN);
    }
    var lcdScreenOffset = 0;
    if (encoderId > 0) {
        //24 / 8 === 3 && 31 / 8 === 3, so (0, 1, 2, 3)
        lcdScreenOffset = ~~(encoderId / ENCODERS_PER_LCD_SCREEN);
    }
    if (!(lcdScreenOffset < TOTAL_LCD_SCREENS)) {
        post("C4Device.generateLcdFeedback: encoderID assumption issue, lcd display offset greater than expected", lcdScreenOffset);post();
    }
    encoderDisplayRefRow += lcdScreenOffset;
    var encIdsInRow = encIndexesByLcdRowDict.get(encoderDisplayRefRow);
    var topLine = [];
    var btmLine = [];
    for (var i = 0; i < encIdsInRow.length; i++) {
        var encDict = encodersDict.get(encIdsInRow[i]);
        var c4Enc = utilEncoder.newFromDict(encDict);
        topLine = c4Enc.pushLcdDisplaySegmentTopSysexBytes(topLine);
        btmLine = c4Enc.pushLcdDisplaySegmentBottomSysexBytes(btmLine);
    }
    if (topLine.length !== TOTAL_BYTES_PER_SYSEX_MSG) {// 240...247
        post("C4Device.generateLcdFeedback: top line sysex msg length issue", topLine.length, topLine.toString());
    }
    if (btmLine.length !== TOTAL_BYTES_PER_SYSEX_MSG) {
        post("C4Device.generateLcdFeedback: bottom line sysex msg length issue", btmLine.length, btmLine.toString());
    }
    var rtn = [topLine, btmLine];
    // the "top line" feedback only changes once per "series" of encoder events on any single lcd row,
    // with the first event in each series.
    var lcdRowId = topLine[5];
    if (lastTopSysex.length === topLine.length) {
        if (arraysMatch(lastTopSysex, topLine)) {
            // even when not sent to the C4, this feedback message still needs to signal to the sequencer which
            // lcd row the feedback message would be going to
            rtn[0] = [ABORT_FEEDBACK_SIGNAL, ENCODER_BTN_OFFSET, 0, 0, 0, lcdRowId];
        } else {
            lastTopSysex = topLine;
        }
    } else {
        lastTopSysex = topLine;
    }
    // the "bottom line" feedback stops changing when the stored data stops changing.
    // For example, if the data value hits the "bucket full" value, which is 127 by default,
    // and the encoder continues turning in the clockwise direction...
    if (lastBtmSysex.length === btmLine.length) {
        if (arraysMatch(lastBtmSysex, btmLine)) {
            // even when not sent to the C4... see above
            rtn[1] = [ABORT_FEEDBACK_SIGNAL, ENCODER_BTN_OFFSET, 0, 0, 0, 0, lcdRowId];
        } else {
            lastBtmSysex = btmLine;
        }
    } else {
        lastBtmSysex = btmLine;
    }

    return rtn;
}
function arraysMatch(left, right) {
    var rtn = false;
    if(!(left === undefined || right === undefined)) {
        if (left.length === right.length) {
            var allMatch = true;
            for (var i = 0; i < left.length; i++) {
                if (left[i] !== right[i]) {
                    allMatch = false;
                    break;
                }
            }
            if (allMatch) {
                rtn = true;
            }
        }
    }
    return rtn;
}

function generateDisplayPageChangeMsgs() {
    return generateDisplayPageUpdateMsgs();// no "hot sequencer step" to display
}

function clearLastSequencerStep(signal) {
    if (signal === 1 && isPatchProcessingEnabled()) {
        sendEncoderPageData(generateDisplayPageChangeMsgs);
    }
}
function generateWelcomePageMsgs() {
    encodersDict.name = "c4Encoders";
    buttonsDict.name = "c4Buttons";
    var rtn0 = [];
    for (var j = 0; j < 9; j++) {
        // Always also send nine panel LED feedback Note messages at welcome (clears any "stuck ON" panel LEDs when reloading project patch)
        var c4Btn = utilButton.newFromDict(buttonsDict.get(j));
        rtn0.push(MIDI_NOTE_ON_ID);
        rtn0.push(c4Btn.index);
        rtn0.push(c4Btn.ledValue);
    }
    var sysexTop00 = [];
    var sysexTop01 = [];
    var sysexTop02 = [];
    var sysexTop03 = [];
    var sysexBtm00 = [];
    var sysexBtm01 = [];
    var sysexBtm02 = [];
    var sysexBtm03 = [];
    var isBottomLine = true;
    for (var i = 0; i < NBR_PHYSICAL_ENCODERS; i++) {
        var encDict = encodersDict.get(i);
        var c4Enc = utilEncoder.newFromDict(encDict);
        rtn0.push(MIDI_CC_ID);
        rtn0.push(c4Enc.getFeedbackId());
        rtn0.push(c4Enc.getFeedbackValueForWelcome());
        switch(c4Enc.getLcdRowId()) {
            case 0:
                sysexTop00 = c4Enc.pushLcdDisplaySegmentWelcomeSysexBytes(sysexTop00);
                sysexBtm00 = c4Enc.pushLcdDisplaySegmentWelcomeSysexBytes(sysexBtm00, isBottomLine);
                break;
            case 1:
                sysexTop01 = c4Enc.pushLcdDisplaySegmentWelcomeSysexBytes(sysexTop01);
                sysexBtm01 = c4Enc.pushLcdDisplaySegmentWelcomeSysexBytes(sysexBtm01, isBottomLine);
                break;
            case 2:
                sysexTop02 = c4Enc.pushLcdDisplaySegmentWelcomeSysexBytes(sysexTop02);
                sysexBtm02 = c4Enc.pushLcdDisplaySegmentWelcomeSysexBytes(sysexBtm02, isBottomLine);
                break;
            case 3:
                sysexTop03 = c4Enc.pushLcdDisplaySegmentWelcomeSysexBytes(sysexTop03);
                sysexBtm03 = c4Enc.pushLcdDisplaySegmentWelcomeSysexBytes(sysexBtm03, isBottomLine);
                break;
            default:
                post("C4Device.generateWelcomePageMsgs: unexpected lcd row ID", c4Enc.getLcdRowId(), c4Enc.toJsonStr());
        }
    }// end for (var i = 0; i < NBR_PHYSICAL_ENCODERS; i++)

    for (var k = 0; k < sysexBtm00.length; k++) {
        sysexTop00.push(sysexBtm00[k]);
        sysexTop01.push(sysexBtm01[k]);
        sysexTop02.push(sysexBtm02[k]);
        sysexTop03.push(sysexBtm03[k]);
    }
    return [rtn0, sysexTop00, sysexTop01, sysexTop02, sysexTop03];
}
function generateDisplayPageUpdateMsgs(seqStepId) {

    encodersDict.name = "c4Encoders";
    buttonsDict.name = "c4Buttons";
    var encoderPageOffset = reqModule.getPageOffset();
    var rtn0 = [];
    var rtnZ = [];
    for (var j = 0; j < 9; j++) {
        // Also send these nine Note messages when an encoder page displays. (The 9 physical LEDs below the encoders
        // The (three buttons and) five LEDs in the "Function Group" on the C4 need to get "refreshed"
        // when "processing events" here  and the "on duty" deck crews change because the "Function Group" button data is unique per deck
        // and the assignment group LEDs need refreshing when returning to duty after bypassing "event processing"
        // (when the remote script goes into USER mode and bypasses processing in deference to this patch's processing, the sequencer)
        //* Don't mess with the "Lock LED pulse" (j === 3) if the sequencer is running
        var isRunning = seqStepId !== undefined;
        var lockLedOverride = isRunning && j === 3;
        if (!lockLedOverride) {
            var c4Btn = utilButton.newFromDict(buttonsDict.get(j));
            rtnZ.push(MIDI_NOTE_ON_ID);
            rtnZ.push(c4Btn.index);
            rtnZ.push(c4Btn.ledValue);
        }
    }
    var sysexTop00 = [];
    var sysexTop01 = [];
    var sysexTop02 = [];
    var sysexTop03 = [];
    var sysexBtm00 = [];
    var sysexBtm01 = [];
    var sysexBtm02 = [];
    var sysexBtm03 = [];
    for (var i = encoderPageOffset; i < (encoderPageOffset + NBR_PHYSICAL_ENCODERS); i++) {
        var encDict = encodersDict.get(i);
        var c4Enc = utilEncoder.newFromDict(encDict);
        rtn0.push(MIDI_CC_ID);
        rtn0.push(c4Enc.getFeedbackId());
        rtn0.push(c4Enc.getFeedbackValueForRingStyle(seqStepId));
        switch(c4Enc.getLcdRowId()) {
            case 0:
                sysexTop00 = c4Enc.pushLcdDisplaySegmentTopSysexBytes(sysexTop00, seqStepId);
                sysexBtm00 = c4Enc.pushLcdDisplaySegmentBottomSysexBytes(sysexBtm00, seqStepId);
                break;
            case 1:
                sysexTop01 = c4Enc.pushLcdDisplaySegmentTopSysexBytes(sysexTop01, seqStepId);
                sysexBtm01 = c4Enc.pushLcdDisplaySegmentBottomSysexBytes(sysexBtm01, seqStepId);
                break;
            case 2:
                sysexTop02 = c4Enc.pushLcdDisplaySegmentTopSysexBytes(sysexTop02, seqStepId);
                sysexBtm02 = c4Enc.pushLcdDisplaySegmentBottomSysexBytes(sysexBtm02, seqStepId);
                break;
            case 3:
                sysexTop03 = c4Enc.pushLcdDisplaySegmentTopSysexBytes(sysexTop03, seqStepId);
                sysexBtm03 = c4Enc.pushLcdDisplaySegmentBottomSysexBytes(sysexBtm03, seqStepId);
                break;
            default:
                post("C4Device.generateDisplayPageUpdateMsgs: unexpected lcd row ID", c4Enc.getLcdRowId(), c4Enc.toJsonStr());
        }
    }

    for (var k = 0; k < sysexBtm00.length; k++) {
        sysexTop00.push(sysexBtm00[k]);
        sysexTop01.push(sysexBtm01[k]);
        sysexTop02.push(sysexBtm02[k]);
        sysexTop03.push(sysexBtm03[k]);
    }
    return [rtn0, sysexTop00, sysexTop01, sysexTop02, sysexTop03, rtnZ];
}

var lastLcdSeq00 = [];
var lastLcdSeq01 = [];
var lastLcdSeq02 = [];
var lastLcdSeq03 = [];
function processSequencerStep(encoderId) {

    if (!isPatchProcessingEnabled()) {
        return;
    }

    var currentDisplayPage = generateDisplayPageUpdateMsgs(encoderId);
    if (currentDisplayPage[0].length < 96) {
        post("C4Device.processSequencerStep: CC msg array length is shorter than it is supposed to be"); post();
    }

    if (!arraysMatch(lastLcdSeq00, currentDisplayPage[1])) {
        lastLcdSeq00 = currentDisplayPage[1];
        outlet(1, currentDisplayPage[1]);
        sendUpdatedPageInfo(lastLcdSeq03, currentDisplayPage, encoderId);
    }
    if (!arraysMatch(lastLcdSeq01, currentDisplayPage[2])) {
        lastLcdSeq01 = currentDisplayPage[2];
        outlet(1, currentDisplayPage[2]);
        sendUpdatedPageInfo(lastLcdSeq00, currentDisplayPage, encoderId);
    }
    if (!arraysMatch(lastLcdSeq02, currentDisplayPage[3])) {
        lastLcdSeq02 = currentDisplayPage[3];
        outlet(1, currentDisplayPage[3]);
        sendUpdatedPageInfo(lastLcdSeq01, currentDisplayPage, encoderId);
    }
    if (!arraysMatch(lastLcdSeq03, currentDisplayPage[4])) {
        lastLcdSeq03 = currentDisplayPage[4];
        outlet(1, currentDisplayPage[4]);
        sendUpdatedPageInfo(lastLcdSeq02, currentDisplayPage, encoderId);
    }
    if (currentDisplayPage.length > 5) {
        // Note messages refreshing the five "Function group" button LEDs
        outlet(0, currentDisplayPage[5]);
    }
}

// Possibly sending 1 Sysex msg to clear the "last step" from the previous lcd.
// Always sending 2 CC messages, the "hot step" led-ring display msg data, and the "previous step" msg.
// (in both cases replacing the hot step feedback with normal feedback data again)
function sendUpdatedPageInfo(last, current, encId) {

    if (!isPatchProcessingEnabled()) {
        return;
    }

    var lcdColumn = encId % ENCODERS_PER_LCD_SCREEN;
    var isLCDRowChangeId = lcdColumn === 0;// true when Id is 0, 8, 16, or 24
    var ccMsgLgth = 3;
    var ccMsgMaxLength = 96;
    var boundary = ccMsgMaxLength;
    if (encId < ENCODERS_PER_LCD_SCREEN) {
        boundary = 0;// boundary index 0 for IDs < 8 && >= 0
    } else if (encId < 16) {
        boundary = 24;// 8 encoders * 3 bytes per cc == cc msg boundary index 24 for IDs < 16 && >= 8
    } else if (encId < 24) {
        boundary = 48;// 8 encoders * 3 bytes per cc == cc msg boundary index 48 for IDs < 24 && >= 16
    } else if (encId < 32) {
        boundary = 72;// 8 encoders * 3 bytes per cc == cc msg boundary index 72 for IDs < 32 && >= 24
    } else {//if (boundary === 96) {
        post("C4Device.sendUpdatedPageInfo: encoder id to cc msg boundary assumption failure"); post();
    }
    var ccMsgRowBoundaryIndex = boundary;
    var rowCCs = [];
    if (isLCDRowChangeId) {
        if (encId === 0) {
            for (var i = ccMsgMaxLength - ccMsgLgth; i < ccMsgMaxLength; i++) {
                rowCCs.push(current[0][i]);// encoder 31 lcd 3
            }
            for (i = 0; i < ccMsgLgth; i++) {
                rowCCs.push(current[0][i]);// encoder 0 lcd 0
            }
        } else {
            for (i = ccMsgRowBoundaryIndex - ccMsgLgth; i < ccMsgRowBoundaryIndex + ccMsgLgth; i++) {
                rowCCs.push(current[0][i]);// when boundary case is 24: encoder 23 lcd 2, encoder 24 lcd 3
            }
        }
    } else {// lcdColumn > 0
        var hotStepCC = ccMsgRowBoundaryIndex + (lcdColumn * ccMsgLgth);
        var start = hotStepCC - ccMsgLgth;//rewrite the previous step with normal data
        var stop = hotStepCC + ccMsgLgth;// write the current step "hot"
        for (i = start; i < stop; i++) {
            rowCCs.push(current[0][i]);
        }
    }
    outlet(0, rowCCs);

    var boundaryPageIndex = 0;
    // The "magic" boundaryPageIndex value switched here is based on knowing the "array index format" of the
    // return value from the processDisplayPageUpdate() function where indexes 1 - 4 reference
    // the 4 sysex message arrays returned (and index 0 references the cc message array returned)
    switch(boundary) {
        case 72: boundaryPageIndex = 3; break;// when boundary is 72, send current[3] to outlet 1 as needed
        case 48: boundaryPageIndex = 2; break;
        case 24: boundaryPageIndex = 1; break;
        case 0: boundaryPageIndex = 4; break;
    }
    if (boundaryPageIndex === 0) {
        post("C4Device.sendUpdatedPageInfo: cc msg boundary to page index assumption failure"); post();
    }
    if (isLCDRowChangeId) {
        last = current[boundaryPageIndex];
        outlet(1, current[boundaryPageIndex]);
    }
}

function buttonsToJsonArr() {
    buttonsDict.name = "c4Buttons";
    var rtn = "[";
    for(var i = 0; i < TOTAL_BUTTONS; i++) {
        if (i > 0) {
            rtn += ", ";
        }
        rtn += buttonsDict.get(i);
    }
    return rtn + "]";
}
function encodersToJsonArr() {
    encodersDict.name = "c4Encoders";
    var rtn = "[";
    for(var i = 0; i < TOTAL_ENCODERS; i++) {
        if (i > 0) {
            rtn += ", ";
        }
        rtn += encodersDict.get(i);
    }
    return rtn + "]";
}

function bang(){
    post("The current button details are:");post();
    post(buttonsToJsonArr());post();
    post("The current encoder details are:");post();
    post(encodersToJsonArr());post();
}
// this is the project's main "C4Device" javascript file
// (the inlets and outlets are defined here)
// This javascript implements a "C4 device midi data" server where the C4 itself is the
// server's only "midi data client" connection.
//
// The loadUp() function should be called before any midi messages get received and processed.
//
// Otherwise, the "public" functions are designed to be:
// function midievent(midiMsgIn) {
// function processSequencerStep(encoderId) {
// function clearLastSequencerStep(signal) {
// plus maybe callback functions (after they work?)...
//
inlets = 1;
outlets = 3;
//
//
//   ---- C4Device GLOBAL function definitions -----
//
//

include("Consts.js");// const before everybody
include("C4Button.js");
include("C4Encoder.js");

var lastEncoderPageOffset = 0;
var lastTopSysex = [];
var lastBtmSysex = [];
var isInitialized = false;
var utilEncoder = new C4Encoder();
var utilButton = new C4Button();

function loadUp() {
    if (!isInitialized) {
        // Run garbage collection to clear out any old objects.
        gc();
        initButtons();
        initEncoders("single");// "Single Dot" ring feedback style by default on load
        encLedRingFeedbackStyleDict.import_json("ledRingFeedbackStyleReference.json");
        encIndexesByLcdRowDict.import_json("rowMap16RowsOf8Keys.json");
        sendEncoderPageData(generateWelcomePageMsgs);
        isInitialized = true;
    }
}
function forceLoadUp() {
    isInitialized = false;
    loadUp();
}

function initButtons()
{
    buttonsDict.name = "c4Buttons";
    btnStateDict.name = "buttonStateChangeCount";
    ledStateDict.name = "ledStateChangeCount";
    for(var i = 0; i < TOTAL_BUTTONS; i++) {
        // only 51 actual buttons 19 + 32
        // only 38ish actual leds [1-3] + 6 + 32
        var button = new C4Button(i, i.toString(), BUTTON_RELEASED_VALUE, 0, 0,
                                    0, BUTTON_LED_OFF_VALUE);
        var btnDict = new Dict(button.name);
        btnDict.parse(button.toJsonObj());
        buttonsDict.set(i, btnDict);
        var buttonJson = buttonsDict.get(i);
        button = utilButton.newFromDict(buttonJson);
        btnStateDict.set(i, button.pressedCount);
        ledStateDict.set(i, button.ledChangeCount);
    }
}

// Max's console doesn't post() the correct Dict values above or below, but they're correct
function initEncoders(feedbackStyle) {
    encodersDict.name = "c4Encoders";
    encBtnReleasedStateDict.name = "encoderBtnReleasedData";
    encBtnPressedStateDict.name = "encoderBtnPressedData";
    for(var i = 0; i < TOTAL_ENCODERS; i++) {
        var encoder = new C4Encoder(i, i.toString(), 0, 0, feedbackStyle, BUTTON_LED_OFF_VALUE,
                                            0, 0, 0, 0, 0);
        encodersDict.setparse(i, encoder.toJsonObj());
        var encoderJson = encodersDict.get(i);
        encoder = utilEncoder.newFromDict(encoderJson);
        encBtnReleasedStateDict.set(i, encoder.releasedValue);
        encBtnPressedStateDict.set(i, encoder.pressedValue);
    }
}

function midievent(midiMsgIn) {
    encodersDict.name = "c4Encoders";

    var MIDI_MSG_SIZE = 3;
    var midiMsg = arrayfromargs(arguments);
    var size = midiMsg.length;
    if (size > MIDI_MSG_SIZE - 1) {
        var feedbackMsg = [midiMsg[0], midiMsg[1], midiMsg[2], 0];
        var pageChangeSignal = 0;
        if (size === MIDI_MSG_SIZE) {
            if (midiMsg[0] === MIDI_NOTE_ON_ID) {
                feedbackMsg = processButtonMessage(midiMsg);
                if (!(feedbackMsg[1] < ENCODER_BTN_OFFSET)) {
                    // encoder button feedback
                    // The C4 drops (ignores) midi messages for Note message numbers > 31
                    // (and only has 9 physical button LEDs for Note message numbers < 9)
                    feedbackMsg[0] = MIDI_CC_ID;
                    var encoderId = (feedbackMsg[1] - ENCODER_BTN_OFFSET) + reqModule.getPageOffset();
                    var encoderJson = encodersDict.get(encoderId);
                    var encoder = utilEncoder.newFromDict(encoderJson);
                    feedbackMsg[2] = encoder.getFeedbackValueForRingStyle();
                } else if (feedbackMsg[1] < 3 && midiMsg[2] === BUTTON_RELEASED_VALUE) {
                    // Split button "released" feedback.
                    var encoderPageOffset = reqModule.getPageOffset();
                    // post("midievent: did the encoder-feedback-display page change?");
                    if (lastEncoderPageOffset !== encoderPageOffset) {
                        // post("YES, offset", lastEncoderPageOffset, "going to", encoderPageOffset);post();
                        lastEncoderPageOffset = encoderPageOffset;
                        pageChangeSignal = 1;
                    } else {
                        // post("NO, offset", lastEncoderPageOffset, "remaining", encoderPageOffset);post();
                    }
                } else if (feedbackMsg[1] >= 9 && feedbackMsg[1] <= 12 && midiMsg[2] === BUTTON_RELEASED_VALUE) {
                    // (Parameter) Bank Left, Bank Right; Single Left or Single Right Button "released" feedback
                    // Transform "encoder book" dict data by rotation
                    // +/- 32 for Bank Right, Left and +/- 8 for Single Right, Left
                    // wrapping % 128 so 00 - 08 == 120
                    transformEncoderBookData(feedbackMsg[1]);
                    pageChangeSignal = 1;
                } else if (feedbackMsg[1] > 16 && midiMsg[2] === BUTTON_RELEASED_VALUE) {
                    // && feedbackMsg[1] < ENCODER_BTN_OFFSET
                    // (Session) Slot Up, or Down; Track Left or Right Button "released" feedback
                    // Transform "encoder page" dict data by rotation
                    // +/- 1 for Right, Left and +/- 8 for Down, Up
                    // wrapping % 32 so 00 - 08 == 24
                    transformEncoderPageData(feedbackMsg[1]);
                    pageChangeSignal = 1;
                }
                // pass all other button feedback messages
            } else if (midiMsg[0] === MIDI_CC_ID) {
                feedbackMsg = processEncoderMessage(midiMsg);
            }
        } else {
            post("midievent: too big for a 3 byte midi message", arguments);post();
        }

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
                    outlet(0, lcdFdbkMsg[0]);//top line
                }
                if (lcdFdbkMsg[1][0] !== ABORT_FEEDBACK_SIGNAL) {
                    outlet(0, lcdFdbkMsg[1]);//bottom line
                }
            }
        } else {
            post("midievent: unexpected event processing result", feedbackMsg.toString());post();
        }
    } else {
        post("midievent: too small for a 3 byte midi message", arguments);post();
    }
}


function sendEncoderPageData(encoderPageDataCallback) {
    var MILLIS_OF_LATENCY_BETWEEN_SYSEX = 5;
    var rtn = encoderPageDataCallback();
    if (rtn.length < 5) {
        post("displayCurrentPage: unexpected display processing result", rtn.toString());post();
    } else {
        for (var i = 0; i < rtn.length; i++) {
            if (i === 0) {
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
        var feedbackRtn = [midiNoteMsg[0],midiNoteMsg[1],midiNoteMsg[2], 0];
        var buttonJson = buttonsDict.get(midiNoteMsg[1]);
        var c4Button = utilButton.newFromDict(buttonJson);
        var rtn = c4Button.processEvent(midiNoteMsg[2]);
        if (midiNoteMsg[1] !== rtn[0]) {
            if (midiNoteMsg[1] === 0 && rtn[0] < 3) {
                // pass this expected Split button feedback address mismatch silently
            } else {
                post("processButtonMessage: Note number feedback address mismatch", midiNoteMsg.toString(), rtn.toString());
                post();
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
        post("processButtonMessage: not a 3 arg midi Note message", arguments);post();
        return [0, 0, 0, 0];
    }
}

function processEncoderMessage(midiCCMsg) {
    encodersDict.name = "c4Encoders";
    var size = midiCCMsg.length;
    if (size === 3) {
        var feedbackRtn = [midiCCMsg[0], midiCCMsg[1], midiCCMsg[2], 0];
        var encoderJson = encodersDict.get(midiCCMsg[1] + reqModule.getPageOffset());
        var c4Encoder = utilEncoder.newFromDict(encoderJson);
        var rtn = c4Encoder.processIncrement(midiCCMsg[2]);
        if (midiCCMsg[1] + ENCODER_BTN_OFFSET !== rtn[0]) {
            post("processEncoderMessage: CC number feedback address mismatch", midiCCMsg.toString(), rtn.toString());
            post();
        }
        //feedbackRtn[0] = midiCCMsg[0];// MIDI_CC_ID (176)
        feedbackRtn[1] = rtn[0];// the last updated "encoder Key" (no page offset) feedback address
        feedbackRtn[2] = rtn[1];// the last updated stored Dict value (0 to 127 range by default)(scaled for led ring)
        feedbackRtn[3] = rtn[2];// the "normalized" CC increment value (negative for counter-clockwise input values)

        return feedbackRtn;// first 3 indexes make the midi feedback message, 4th index is "error checking"
    } else {
        post("processEncoderMessage: not a 3 arg midi CC message", arguments);post();
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
        post("transformEncoderPageData: unexpected buttonId input", buttonId); post();
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
        post("transformEncoderBookData: unexpected buttonId input", buttonId);post();
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
        after[0].updateMyDict();// encoders
        after[1].updateMyDict();// encoder buttons
    }
}

function isSequencerRunning() {
    buttonsDict.name = "c4Buttons";
    // Note ID 21 is a logically spare button element (doesn't physically exist on the C4) being used
    // to globally signal (from Max to javascript via dict data) the state of the patch's "external transport"
    var isExternalSyncSelected = buttonsDict.get("21::ledValue") === BUTTON_LED_ON_VALUE;
    if (isExternalSyncSelected) {
        return 0 !== buttonsDict.get("21::pressedValue");// pressed === running
    }
    return 0 !== buttonsDict.get("4::ledValue");// Note ID 4 === Spot Erase button === Sequencer Start/Stop
}

function generateLcdFeedback(encoderId) {
    // encoderId should be "raw midi CC" sender (00 - 31)
    encodersDict.name = "c4Encoders";
    encIndexesByLcdRowDict.name = "lcdScreenRowIndexRef";
    var encoderPageOffset = reqModule.getPageOffset();

    var encoderDisplayRefRow = 0;// ~~0/8 === 0.00?
    if (encoderPageOffset > 0) {
        // 32/8 == RowIndex 4, 64/8 == RowIndex 8, 96/8 == RowIndex 12
        // encoderDisplayRefRow points to first lcdScreenRowIndexRef Dict key of encoderPageOffset data
        encoderDisplayRefRow = ~~(encoderPageOffset / ENCODERS_PER_LCD_SCREEN);
    }
    var lcdScreenOffset = 0;
    if (encoderId > 0) {
        //24 / 8 === 3 && 31 / 8 === 3, so (0, 1, 2, 3)
        // we don't yet have a "C4 Encoder" object to identify its LCD for us here, we just have the midi cc ID
        lcdScreenOffset = ~~(encoderId / ENCODERS_PER_LCD_SCREEN);
    }
    if (!(lcdScreenOffset < TOTAL_LCD_SCREENS)) {
        post("generateLcdFeedback: encoderID assumption issue, lcd display offset greater than expected",
            lcdScreenOffset);post();
    }
    encoderDisplayRefRow += lcdScreenOffset;
    var encIdsInRow = encIndexesByLcdRowDict.get(encoderDisplayRefRow);
    var topLine = [];
    var btmLine = [];
    for (var i = 0; i < encIdsInRow.length; i++) {
        var encJson = encodersDict.get(encIdsInRow[i]);
        var c4Enc = utilEncoder.newFromDict(encJson);
        topLine = c4Enc.pushLcdDisplaySegmentTopSysexBytes(topLine);
        btmLine = c4Enc.pushLcdDisplaySegmentBottomSysexBytes(btmLine);
    }
    if (topLine.length !== TOTAL_BYTES_PER_SYSEX_MSG) {// 240...247
        post("generateLcdFeedback: top line sysex msg length issue", topLine.length, topLine.toString());
    }
    if (btmLine.length !== TOTAL_BYTES_PER_SYSEX_MSG) {
        post("generateLcdFeedback: bottom line sysex msg length issue", btmLine.length, btmLine.toString());
    }
    var rtn = [topLine, btmLine];
    // the "top line" feedback only changes once per "series" of encoder events on any single lcd row,
    // with the first event in each series.
    var lcdRowId = topLine[5];
    if (lastTopSysex.length === topLine.length) {
        if (arraysMatch(lastTopSysex, topLine)) {
            // even if aborted, still need to signal to sequencer which lcd row message got aborted
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
            // even if aborted, still need to signal to sequencer which lcd row message got aborted
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
    if (signal === 1) {
        sendEncoderPageData(generateDisplayPageChangeMsgs);
    }
}
function generateWelcomePageMsgs() {
    encodersDict.name = "c4Encoders";
    var rtn0 = [];
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
        var encJson = encodersDict.get(i);
        var c4Enc = utilEncoder.newFromDict(encJson);
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
                post("processDisplayWelcomePage: unexpected lcd row ID", c4Enc.getLcdRowId(), c4Enc.toJsonObj());
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
    var encoderPageOffset = reqModule.getPageOffset();
    var rtn0 = [];
    var sysexTop00 = [];
    var sysexTop01 = [];
    var sysexTop02 = [];
    var sysexTop03 = [];
    var sysexBtm00 = [];
    var sysexBtm01 = [];
    var sysexBtm02 = [];
    var sysexBtm03 = [];
    for (var i = encoderPageOffset; i < (encoderPageOffset + NBR_PHYSICAL_ENCODERS); i++) {
        var encJson = encodersDict.get(i);
        var c4Enc = utilEncoder.newFromDict(encJson);
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
                post("processDisplayPageChange: unexpected lcd row ID", c4Enc.getLcdRowId(), c4Enc.toJsonObj());
        }
    }// end for (var i = encoderPageOffset; i < (encoderPageOffset + NBR_PHYSICAL_ENCODERS); i++)

    for (var k = 0; k < sysexBtm00.length; k++) {
        sysexTop00.push(sysexBtm00[k]);
        sysexTop01.push(sysexBtm01[k]);
        sysexTop02.push(sysexBtm02[k]);
        sysexTop03.push(sysexBtm03[k]);
    }
    return [rtn0, sysexTop00, sysexTop01, sysexTop02, sysexTop03];
}

var lastLcdSeq00 = [];
var lastLcdSeq01 = [];
var lastLcdSeq02 = [];
var lastLcdSeq03 = [];
function processSequencerStep(encoderId) {

    var currentDisplayPage = generateDisplayPageUpdateMsgs(encoderId);
    if (currentDisplayPage[0].length < 96) {
        post("processSequencerStep: CC msg array length is shorter than it is supposed to be"); post();
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
}

// Possibly sending 1 Sysex msg to clear the "last step" from the previous lcd.
// Always sending 2 CC messages, the "hot step" led-ring display msg data, and the "previous step" msg.
// (in both cases replacing the hot step feedback with normal feedback data again)
function sendUpdatedPageInfo(last, current, encId) {
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
        post("sendUpdatedPageInfo: encoder id to cc msg boundary assumption failure"); post();
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
        post("sendUpdatedPageInfo: cc msg boundary to page index assumption failure"); post();
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
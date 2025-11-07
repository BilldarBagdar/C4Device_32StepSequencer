

include("Consts.js");
include("C4Button.js");
include("C4Encoder.js");
include("C4DeviceController.js");

inlets = 1;
// out 0 === "normal" midi feedback msg to C4 hardware (from this librarian)
// out 1 === "emulated C4" midi msg feed to C4Device.js
outlets = 2;


var utilEncoder = new C4Encoder();
var utilButton = new C4Button();
var librarian = new C4DeviceController("single");

var lastEncoderValues = {};
var controlButtonObjects = {};
var functionButtonIndex = 8;// no LEDs for Modifiers, Parameter, nor Session Control buttons
var midiProcessingLock = {} //=== unlocked, > 0 = locked
var isInitialized = false;
var sayHello = false;

var myCallerName = "lib";
var myVarname = LIBRARIAN_SCRIPTING_NAME;

function notifydeleted() {
    reqModule.setLibrarianObj(undefined);
}


// This Librarian has two basic functions.  First, it functions as a virtual "C4 display".  Whatever "feedback" is
// shown on the physical C4 display is also shown on this patcher (by the UI objects).  The other Librarian function
// is "sequence editor".  Whatever "sequence details" are showing on the displayed deck.page can be copied/saved to
// any other deck.page.  This behavior unlocks the ability to build a page of sequence sata (from a blank page, an
// empty sequence, say) and then easily copy that "page data" (sequence) to any page on any deck of the "device
// controller" (dict db)
function init() {
    isInitialized = false;
    gc();// remove any existing before adding new
    c4DeviceControllerDict.name = "C4DeviceExecutiveController";



    // The ‘box’ property of our patcher returns a Maxobj referring to our js object itself
    var thisMaxBox = this.box;
    if (thisMaxBox.valid) {
        thisMaxBox.varname = myVarname;
        reqModule.setLibrarianObj(thisMaxBox);
        // if (reqModule.isLibrarianObjValid()) {
        //     post("init: librarian maxobj", thisMaxBox.varname,  "is valid"); post();
        // } else {
        //     post("init: librarian maxobj is NOT valid"); post();
        // }
    }

    if (reqModule.isC4DeviceObjValid()) {
        // post("init: C4Device js object reference already valid"); post();
        messnamed("librarianHandshake", 1);
    } else {
        var maxobj = reqModule.getC4DeviceObj(myCallerName);// caller
        if (maxobj && maxobj.valid) {
            messnamed("librarianHandshake", 1);
            // post("init: C4Device js object reference now valid"); post();
        }
        // else {
        //     post("init: C4Device js object reference NOT yet valid"); post();
        // }
    }
    if (isC4DevicePresent()) {
        // only initialize AFTER C4Device has "loaded up" all the runtime Dictionary data
        librarian = librarian.newFromDict(c4DeviceControllerDict);
        lastEncoderValues = {};
        controlButtonObjects = {};
        midiProcessingLock["procLock"] = 0;
        lastProcessingMode = midiProcessingLock["procLock"];

        lastEncoderValues["enb"] = {};
        lastEncoderValues["enc"] = {};
        lastEncoderValues["obj"] = {};

        setupOneEncoderListener(0, cbEnb00, cbEnc00);
        setupOneEncoderListener(1, cbEnb01, cbEnc01);
        setupOneEncoderListener(2, cbEnb02, cbEnc02);
        setupOneEncoderListener(3, cbEnb03, cbEnc03);
        setupOneEncoderListener(4, cbEnb04, cbEnc04);
        setupOneEncoderListener(5, cbEnb05, cbEnc05);
        setupOneEncoderListener(6, cbEnb06, cbEnc06);
        setupOneEncoderListener(7, cbEnb07, cbEnc07);

        setupOneEncoderListener(8, cbEnb08, cbEnc08);
        setupOneEncoderListener(9, cbEnb09, cbEnc09);
        setupOneEncoderListener(10, cbEnb10, cbEnc10);
        setupOneEncoderListener(11, cbEnb11, cbEnc11);
        setupOneEncoderListener(12, cbEnb12, cbEnc12);
        setupOneEncoderListener(13, cbEnb13, cbEnc13);
        setupOneEncoderListener(14, cbEnb14, cbEnc14);
        setupOneEncoderListener(15, cbEnb15, cbEnc15);

        setupOneEncoderListener(16, cbEnb16, cbEnc16);
        setupOneEncoderListener(17, cbEnb17, cbEnc17);
        setupOneEncoderListener(18, cbEnb18, cbEnc18);
        setupOneEncoderListener(19, cbEnb19, cbEnc19);
        setupOneEncoderListener(20, cbEnb20, cbEnc20);
        setupOneEncoderListener(21, cbEnb21, cbEnc21);
        setupOneEncoderListener(22, cbEnb22, cbEnc22);
        setupOneEncoderListener(23, cbEnb23, cbEnc23);

        setupOneEncoderListener(24, cbEnb24, cbEnc24);
        setupOneEncoderListener(25, cbEnb25, cbEnc25);
        setupOneEncoderListener(26, cbEnb26, cbEnc26);
        setupOneEncoderListener(27, cbEnb27, cbEnc27);
        setupOneEncoderListener(28, cbEnb28, cbEnc28);
        setupOneEncoderListener(29, cbEnb29, cbEnc29);
        setupOneEncoderListener(30, cbEnb30, cbEnc30);
        setupOneEncoderListener(31, cbEnb31, cbEnc31);

        setupControlButtonListeners();
        isInitialized = true;
    }
    // else "C4Device" js object has not loaded up any of the common Dict reference data yet

}

function isC4DevicePresent() {
    // var c4DeviceMaxobjValid = reqModule.isC4DeviceObjValid();
    // post("isC4DevicePresent: C4Device valid", c4DeviceMaxobjValid ? "true" : "false"); post();
    // return c4DeviceMaxobjValid;
    return reqModule.isC4DeviceObjValid();
}
isC4DevicePresent.local = 1;

function c4DeviceLoaded() {
    // post("c4DeviceLoaded: method called"); post();
    if (reqModule.isC4DeviceObjValid()) {
        // say hello
        if (isInitialized) {
            messnamed("librarianHandshake", 1);
        }
    } else {
        // since C4Device is calling, and our reference is invalid...
        reqModule.getC4DeviceObj(myCallerName);
    }
    return isC4DevicePresent();
}

function setupOneEncoderListener(index, callbackB, callbackE) {
    var encKey = "enc" + ("00" + index).slice(-2);
    var btnKey = "enb" + ("00" + index).slice(-2);
    var idKey = index.toString();
    var obj = this.patcher.getnamed(btnKey);
    lastEncoderValues["enb"][idKey] = [obj, new MaxobjListener(obj, callbackB)];
    obj = this.patcher.getnamed(encKey);
    lastEncoderValues["enc"][idKey] = [obj, new MaxobjListener(obj, callbackE)];
    lastEncoderValues["obj"][idKey] = new C4Encoder(index);
}
setupOneEncoderListener.local = 1;

function setupControlButtonListeners() {
    var obj = this.patcher.getnamed("SplitButton");
    controlButtonObjects["SplitButton"] = [obj, new MaxobjListener(obj, cbSplitButton)];
    obj = this.patcher.getnamed("Split13");
    controlButtonObjects["Split13"] = [obj, new MaxobjListener(obj, cbSplit13)];
    obj = this.patcher.getnamed("Split22");
    controlButtonObjects["Split22"] = [obj, new MaxobjListener(obj, cbSplit22)];
    obj = this.patcher.getnamed("Split31");
    controlButtonObjects["Split31"] = [obj, new MaxobjListener(obj, cbSplit31)];
    obj = this.patcher.getnamed("Lock");
    controlButtonObjects["Lock"] = [obj, new MaxobjListener(obj, cbLock)];
    obj = this.patcher.getnamed("SpotErase");
    controlButtonObjects["SpotErase"] = [obj, new MaxobjListener(obj, cbSpotErase)];

    obj = this.patcher.getnamed("Marker");
    controlButtonObjects["Marker"] = [obj, new MaxobjListener(obj, cbMarker)];
    obj = this.patcher.getnamed("Track");
    controlButtonObjects["Track"] = [obj, new MaxobjListener(obj, cbTrack)];
    obj = this.patcher.getnamed("ChStrip");
    controlButtonObjects["ChStrip"] = [obj, new MaxobjListener(obj, cbChStrip)];
    obj = this.patcher.getnamed("Function");
    controlButtonObjects["Function"] = [obj, new MaxobjListener(obj, cbFunction)];

    obj = this.patcher.getnamed("BankL");
    controlButtonObjects["BankL"] = [obj, new MaxobjListener(obj, cbBankL)];
    obj = this.patcher.getnamed("BankR");
    controlButtonObjects["BankR"] = [obj, new MaxobjListener(obj, cbBankR)];
    obj = this.patcher.getnamed("StepL");
    controlButtonObjects["StepL"] = [obj, new MaxobjListener(obj, cbStepL)];
    obj = this.patcher.getnamed("StepR");
    controlButtonObjects["StepR"] = [obj, new MaxobjListener(obj, cbStepR)];

    obj = this.patcher.getnamed("Shift");
    controlButtonObjects["Shift"] = [obj, new MaxobjListener(obj, cbShift)];
    obj = this.patcher.getnamed("Option");
    controlButtonObjects["Option"] = [obj, new MaxobjListener(obj, cbOption)];
    obj = this.patcher.getnamed("Control");
    controlButtonObjects["Control"] = [obj, new MaxobjListener(obj, cbControl)];
    obj = this.patcher.getnamed("Alt");
    controlButtonObjects["Alt"] = [obj, new MaxobjListener(obj, cbAlt)];

    obj = this.patcher.getnamed("SlotUp");
    controlButtonObjects["SlotUp"] = [obj, new MaxobjListener(obj, cbSlotUp)];
    obj = this.patcher.getnamed("SlotDn");
    controlButtonObjects["SlotDn"] = [obj, new MaxobjListener(obj, cbSlotDn)];
    obj = this.patcher.getnamed("TrackL");
    controlButtonObjects["TrackL"] = [obj, new MaxobjListener(obj, cbTrackL)];
    obj = this.patcher.getnamed("TrackR");
    controlButtonObjects["TrackR"] = [obj, new MaxobjListener(obj, cbTrackR)];
}
setupControlButtonListeners.local = 1;


function midievent(midiMsgIn) {

    encodersDict.name = "c4Encoders";
    buttonsDict.name = "c4Buttons";
    c4DeviceControllerDict.name = "C4DeviceExecutiveController";
    // the midievent method is basically deprecated in favor of the "fromC4Device" method below
    post("midievent: method called?"); post();
    var isProcessing = isProcessingMode();
    if (isProcessing) {
        midiProcessingLock["procLock"] = 1;

        var midiMsg = arrayfromargs(arguments);
        var unwoundMsgs = unwindMessages(midiMsg);
        processLocalMidievent(unwoundMsgs);
    }
}

function fromC4Device(msg) {
    var isProcessing = isProcessingMode();
    if (isProcessing) {
        midiProcessingLock["procLock"] = 1;
        var unwound = [];
        if (!isArrayInstance(msg)) {
            post("fromC4Device: method called with non Array type input, creating Array from args"); post();
            var midiMsg = arrayfromargs(arguments);
            unwound = unwindMessages(midiMsg);
        } else {
            // post("fromC4Device: method called with Array type input, using Array"); post();
            unwound = unwindMessages(msg);
        }
        processLocalMidievent(unwound);
        midiProcessingLock["procLock"] = 0;
    }

    if (!reqModule.isC4DeviceObjValid()) {
        // since C4Device is calling and the return callout reference is not valid, update
        var maxobj = reqModule.getC4DeviceObj(myCallerName);
        if (!(maxobj && maxobj.valid)) {
            post("fromC4Device: method was called but cant get valid C4Device object reference");
        }
    }
}

function unwindMessages(midiMsg) {
    // example arrays to unwind: [rtn0, sysexTop00, sysexTop01, sysexTop02, sysexTop03, rtnZ];
    // rtn0 might contain 32 CC messages in one 96 element array, the C4 can handle receiving a "continuous stream"
    // of numbers like that as 32 separate midi messages, but not this librarian code.  This function unwinds the
    // combined "stream" of midi messages into individual midi message arrays
    //  176  32  1  176  33  1  176  34  1  176  35  1  176  36  1  176  37  1  176  38  1  176  39  1
    //  176  40  1  176  41  1  176  42  1  176  43  1  176  44  1  176  45  1  176  46  1  176  47  1
    //  176  48  1  176  49  1  176  50  1  176  51  1  176  52  1  176  53  1  176  54  1  176  55  1
    //  176  56  1  176  57  1  176  58  1  176  59  1  176  60  1  176  61  1  176  62  1  176  63  1

    // groups of 32 CC messages and 9 Note messages need to get unwound
    // sysex messages can be ignored
    var rtn = [];
    // post("unwindMessages: ", midiMsg, "begins", midiMsg[0], "and length", midiMsg.length); post();
    var isArrayElement = isArrayInstance(midiMsg[0]);
    if (!isArrayElement) {
        if (midiMsg.length < MIDI_MSG_SIZE) {
            post("unwindMessages: unexpected number of nested midi messages", midiMsg);post();
        } else {
            var woundMsgElement = midiMsg[0];
            if (isArrayInstance(woundMsgElement)) {
                post("unwindMessages: unexpected nested array element depth", woundMsgElement); post();
            } else {
                if (woundMsgElement === MIDI_NOTE_ON_ID || woundMsgElement === MIDI_NOTE_OFF_ID ||
                    woundMsgElement === MIDI_CC_ID) {
                    var j = 0;
                    while (j < midiMsg.length) {
                        var msgSlice = midiMsg.slice(j, j + MIDI_MSG_SIZE);
                        // post("unwindMessages: pushing return slice", msgSlice); post();
                        rtn.push(msgSlice);
                        j += MIDI_MSG_SIZE;
                    }
                } else if (woundMsgElement === MIDI_SYSEX_START_ID) {
                    // post("unwindMessages: ignoring expected sysex slice", woundMsgElement); post();
                } else {
                    post("unwindMessages: msg array has length % 3 === 0, but is not NOTE, CC, or SYSEX", woundMsgElement); post();
                }
            }
        }
    } else {
        post("unwindMessages: unexpected nested array element, recursing into for unwind"); post();
        if (midiMsg.length === 1) {
            post("unwindMessages: unwinding one double wrapped", midiMsg[0]); post();
            rtn = unwindMessages(midiMsg[0]);
        }  else if (midiMsg.length > 1) {
            post("unwindMessages: unwinding several double wrapped"); post();
            for (var k = 0; k < midiMsg.length; k++) {
                post("unwindMessages: recursive call", k, "with", midiMsg[k]); post();
                var unwound = unwindMessages(midiMsg[k]);
                post("unwindMessages: recursive call", k, "result to append", unwound); post();
                rtn.append(unwound);
            }
        }
    }
    // post("unwindMessages: returning", rtn.length, "unwound messages"); post();
    return rtn;
}
unwindMessages.local = 1;

function isArrayInstance(obj) {
    var t = typeof obj;
    if (t === 'object') {
        if (obj) {
            if (obj instanceof Array) {
                return true;
            }
        }
    }
    return false;
}
isArrayInstance.local = 1;

//
function processLocalMidievent(unwoundMsgs) {

    var pageOffset = reqModule.getPageOffset();
    for (var i = 0; i < unwoundMsgs.length; i++) {
        var unwoundMsg = unwoundMsgs[i];
        //post("midievent: processing event ", unwoundMsg); post();
        if (!(unwoundMsg.length === MIDI_MSG_SIZE || isSysexMsg(unwoundMsg))) {
            post("processLocalMidievent: assumption issue, unexpected unwoundMsg length, ignoring", unwoundMsg); post();
        } else {
            var ledOFF = unwoundMsg[2] < ENCODER_RING_BTN_LED_ON_OFFSET;
            var ledVal = ledOFF ? 0 : 1
            var feedbackId = unwoundMsg[1];
            var ringFdbk = isEncoderRingFeedbackMsg(unwoundMsg);
            var controlFdbk = isControlButtonFeedbackMsg(unwoundMsg);
            var signalFeedback = isSignalButtonFeedbackMsg(unwoundMsg);
            if (ringFdbk) {
                // update the "librarian UI" to reflect the feedback data received
                //post("processLocalMidievent: update the 'librarian UI' to reflect the feedback data received"); post();
                processEncoderMessage(feedbackId, pageOffset, false);
            } else if (controlFdbk) {
                if (signalFeedback) {
                    // never happens?  since signal buttons are virtual, C4Device.js doesn't send feedback to the C4,
                    // hence such feedback is never seen here either.
                    var isBypassMsg = mdidMsg[1] === PROCESSING_BYPASS_SIGNAL_ID;
                    if (isBypassMsg) {
                        var msg = [midiMsg, "is a processing bypass signal from the remote script"].join(" ");
                        var intoBypassMode = midiMsg[2] > 0;
                        msg += intoBypassMode ? " to STOP processing" : " to START processing";
                        post("processLocalMidievent:", msg); post();
                    }
                } else {

                    if (feedbackId <= functionButtonIndex && !(feedbackId in [3, 4])) {
                        // page or deck change button feedback, reload "last encoders" from (new) current dict
                        // C4Device.js commonly sends a batch of "control button feedback" messages
                        // sometimes the deck doesn't actually change (precedence rules), but that's not such a big deal
                        // var postMsg = ["page or deck change button feedback", feedbackId,
                        //     "reload 'last encoders' from (new) current dict"].join(" ");
                        // post("processLocalMidievent:", postMsg); post();
                        // for (var s = 0; s < NBR_PHYSICAL_ENCODERS; s++) {
                        //     processEncoderMessage(s + ENCODER_FEEDBACK_ID_OFFSET, pageOffset, false);
                        //     // var encDict = encodersDict.get(s + pageOffset);
                        //     // var eventEncoder = utilEncoder.newFromDict(encDict);
                        //     // var encKey = ("00" + s).slice(-2);
                        //     // // var enc = this.patcher.getnamed("enc" + encKey);
                        //     // var enc = lastEncoderValues["enc"][s.toString()];
                        //     // if (enc.understands("set")) {
                        //     //     enc["set"](eventEncoder.getFeedbackValueRaw());
                        //     //     lastEncoderValues["obj"][s.toString()].copyDataFrom(eventEncoder);
                        //     // } else {
                        //     //     var msg = [enc, "doesn't understand 'set'. stored encoder data",
                        //     //         eventEncoder.getFeedbackValueRaw(), "ignored"].join(" ");
                        //     //     post("processLocalMidievent:", msg);
                        //     //     post();
                        //     // }
                        // }
                    } else if (feedbackId > functionButtonIndex && feedbackId < EXTERNAL_TRANSPORT_STATUS_SIGNAL_ID) {
                        // no physical LED for these physical control buttons, but C4Device.js processes all c4 button
                        // messages the same way so these (physically missing) patcher leds "function" in press+release
                        // pairs like all the other button leds where the button is in effect only when the led is ON.
                        // However, these buttons without a physical led always trigger their effect regardless of
                        // "their" led state.  Modifier buttons matter whether they are pressed or released, Parameter and
                        // Session buttons always trigger their actions. It's just this librarian UI that looks goofy,
                        // but it reflects the incongruous underlying state of the data.
                    }

                    var btn = getPatcherControlButton(feedbackId);
                    if (btn !== undefined && btn.length > 1) {
                        var listener = btn[1];
                        if (listener) {
                            if (listener["setvalue_silent"]) {
                                listener["setvalue_silent"](ledVal);
                                // post("processLocalMidievent: listener.setvalue_silent() called with ledValue", ledVal); post();
                            } else {
                                var msg = ["listener.setvalue_silent() is undefined. ledValue", ledVal, "ignored"].join(" ");
                                post("processLocalMidievent:", msg); post();
                            }
                        } else {
                            var msg = ["stored listener reference for feedbackId", feedbackId, "invalid"].join(" ");
                            post("processLocalMidievent:", msg); post();
                        }
                        // if (btn[0]) {
                        //     if (btn[0].understands("set")) {
                        //         btn["set"](ledVal);
                        //     } else {
                        //         var msg = [btn[0], "doesn't understand 'set'. ledValue", ledVal, "ignored"].join(" ");
                        //         post("processLocalMidievent:", msg);
                        //         post();
                        //     }
                        // } else {
                        //     var msg = ["stored button reference for feedbackId", feedbackId, "invalid"].join(" ");
                        //     post("processLocalMidievent:", msg);
                        //     post();
                        // }
                    } else {//
                        var msg = ["getPatcherControlButton for feedbackId", feedbackId, 
                            "return Array undefined or too short"].join(" ");
                        post("processLocalMidievent:", msg);
                        post();
                    }
                }
            }
            // else ignore
        }
    }
}
processLocalMidievent.local = 1;

function processEncoderMessage(feedbackId, pageOffset, isBlankOut, ledVal) {
    encodersDict.name = "c4Encoders";
    var encoderId = feedbackId - ENCODER_FEEDBACK_ID_OFFSET;
    var encDict = encodersDict.get(encoderId + pageOffset);
    var encId = encoderId.toString();

    var eVal = 0;
    var bVal = 0;
    var eventEncoder = undefined;
    if (encDict) {
        eventEncoder = utilEncoder.newFromDict(encDict);
        eVal = isBlankOut ? 0 : eventEncoder.getFeedbackValueRaw();
        bVal = ledVal !== undefined ? ledVal : isBlankOut ? 0 : eventEncoder.isButtonLedON();
        lastEncoderValues["obj"][encId].copyDataFrom(eventEncoder);
    }

    var btn = lastEncoderValues["enb"][encId];
    if (btn !== undefined && btn.length > 1) {
        var listener = btn[1];
        if (listener) {
            if (listener["setvalue_silent"]) {
                listener["setvalue_silent"](bVal);
                // post("processEncoderMessage: listener.setvalue_silent() called with button value", bVal); post();
            } else {
                var msg = ["listener.setvalue_silent() is undefined, button value", bVal, "ignored"].join(" ");
                post("processEncoderMessage:", msg); post();
            }
        } else {
            var msg = ["stored listener reference for feedbackId", feedbackId, "invalid"].join(" ");
            post("processEncoderMessage:", msg); post();
        }
    } else {
        var msg = ["lastEncoderValues['enb'] for encoderId", encId,
            "return Array undefined or too short"].join(" ");
        post("processEncoderMessage:", msg);
        post();
    }
    // if (btn && btn.understands("set")) {
    //     btn["set"](bVal);
    // } else {
    //     if (btn) {
    //         var msg = [btn, "doesn't understand 'set'. ledValue", bVal, "ignored"].join(" ");
    //         post("processEncoderMessage:", msg);
    //         post();
    //     // }
    //     } else {
    //         post("processEncoderMessage: stored enb reference", encId, "invalid?");
    //         post();
    //     }
    // }
    // var enc = this.patcher.getnamed("enc" + encKey);
    var enc = lastEncoderValues["enc"][encId];
    if (enc !== undefined && enc.length > 1) {
        var listener = enc[1];
        if (listener) {
            if (listener["setvalue_silent"]) {
                listener["setvalue_silent"](eVal);
                // post("processEncoderMessage: listener.setvalue_silent() called with encoder value", eVal); post();
            } else {
                var msg = ["listener.setvalue_silent() is undefined, encoder value", eVal, "ignored"].join(" ");
                post("processEncoderMessage:", msg); post();
            }
        } else {
            var msg = ["stored listener reference for feedbackId", feedbackId, "invalid"].join(" ");
            post("processEncoderMessage:", msg); post();
        }
    } else {//
        var msg = ["lastEncoderValues['enc'] for encoderId", encId,
            "return Array undefined or too short"].join(" ");
        post("processEncoderMessage:", msg); post();
    }
    // if (enc && enc.understands("set")) {
    //     enc["set"](eVal);
    //     if (lastEncoderValues["obj"][encId] !== undefined && eventEncoder !== undefined) {
    //         lastEncoderValues["obj"][encId].copyDataFrom(eventEncoder);
    //     }
    // } else {
    //     if (enc) {
    //         var msg = [enc, "doesn't understand 'set'. feedbackValue", eVal, "ignored"].join(" ");
    //         post("processEncoderMessage:", msg);
    //         post();
    //     } else {
    //         post("processEncoderMessage: stored enc reference", encId, "invalid?");
    //         post();
    //     }
    // }
}
processEncoderMessage.local = 1;

function getPatcherControlButton(feedbackId) {
    var btn = controlButtonObjects["SplitButton"];
    switch (feedbackId) {
        case 0: btn = controlButtonObjects["Split13"]; break;
        case 1: btn = controlButtonObjects["Split22"]; break;
        case 2: btn = controlButtonObjects["Split31"]; break;
        case 3: btn = controlButtonObjects["Lock"]; break;
        case 4: btn = controlButtonObjects["SpotErase"]; break;
        case 5: btn = controlButtonObjects["Marker"]; break;
        case 6: btn = controlButtonObjects["Track"]; break;
        case 7: btn = controlButtonObjects["ChStrip"]; break;
        case 8: btn = controlButtonObjects["Function"]; break;
        case 9: btn = controlButtonObjects["BankL"]; break;
        case 10: btn = controlButtonObjects["BankR"]; break;
        case 11: btn = controlButtonObjects["StepL"]; break;
        case 12: btn = controlButtonObjects["StepR"]; break;
        case 13: btn = controlButtonObjects["Shift"]; break;
        case 14: btn = controlButtonObjects["Option"]; break;
        case 15: btn = controlButtonObjects["Control"]; break;
        case 16: btn = controlButtonObjects["Alt"]; break;
        case 17: btn = controlButtonObjects["SlotUp"]; break;
        case 18: btn = controlButtonObjects["SlotDn"]; break;
        case 19: btn = controlButtonObjects["TrackL"]; break;
        case 20: btn = controlButtonObjects["TrackR"]; break;
        // case 21: btn = controlButtonObjects["ExTrsp"]; break;// external transport active signal
        // case 22: btn = controlButtonObjects["GateOn"]; break;// midi processing active signal
        // case 23: btn = controlButtonObjects["Verbos"]; break;// sequencer verbose mode active signal
        default: btn = undefined;
    }
    return btn;
}
getPatcherControlButton.local = 1;

function isNoteOrCcMsg(midiMsg) {
    return (midiMsg[0] === MIDI_NOTE_ON_ID || midiMsg[0] === MIDI_NOTE_OFF_ID || midiMsg[0] === MIDI_CC_ID);
}
isNoteOrCcMsg.local = 1;
function isSysexMsg(midiMsg) {
    return isSysexFeedback(midiMsg);
}
isSysexMsg.local = 1;

function isEncoderRingFeedbackMsg(midiMsg) {

    var rtn = midiMsg.length === MIDI_MSG_SIZE;
    if (rtn) {
        rtn = midiMsg[0] === MIDI_CC_ID;
        if (rtn) {
            rtn = midiMsg[1] >= ENCODER_FEEDBACK_ID_OFFSET &&
                midiMsg[1] < ENCODER_FEEDBACK_ID_OFFSET + NBR_PHYSICAL_ENCODERS;
            if (!rtn) {
                post("isEncoderRingFeedbackMsg: is CC msg but NOT ring feedback msg", midiMsg); post();
            }
        }
    }
    return rtn

}
isEncoderRingFeedbackMsg.local = 1;

function isControlButtonFeedbackMsg(midiMsg) {

    var rtn = midiMsg.length === MIDI_MSG_SIZE;
    if (rtn) {
        rtn = midiMsg[1] < ENCODER_FEEDBACK_ID_OFFSET && (midiMsg[0] === MIDI_NOTE_ON_ID || midiMsg[0] === MIDI_NOTE_OFF_ID);
    }
    return  rtn;
}
isControlButtonFeedbackMsg.local = 1;

function isSignalButtonFeedbackMsg(midiMsg) {

    var rtn = isControlButtonFeedbackMsg(midiMsg);
    if (rtn) {
        rtn = midiMsg[1] === EXTERNAL_TRANSPORT_STATUS_SIGNAL_ID ||
            midiMsg[1] === PROCESSING_BYPASS_SIGNAL_ID ||
            midiMsg[1] === VERBOSE_SEQUENCER_SIGNAL_ID;
    }
    return  rtn;
}

function isSysexFeedback(midiMsg) {
    return midiMsg[0] === MIDI_SYSEX_START_ID && midiMsg[-1] === MIDI_SYSEX_END_ID;
}
isSysexFeedback.local = 1;

function isProcessingMode() {
    buttonsDict.name = "c4Buttons";
    var rtn = isInitialized;// not processing until initialized
    if (rtn) {
        var btnDict = buttonsDict.get(PROCESSING_BYPASS_SIGNAL_ID);
        if (btnDict) {
            var bypassBtn = utilButton.newFromDict(btnDict);
            if (bypassBtn) {
                rtn = !bypassBtn.isBypassed();// processing when not bypassed
            }
        } else {
            rtn = false;
        }
    }
    // post("isProcessingMode: returning", rtn ? "true" : "false");post();
    return rtn;
}
isProcessingMode.local = 1;

function isMidiLocked() {
    // var lockedOut = midiProcessingLock.get("procLock");
    var lockedOut = midiProcessingLock["procLock"];
    // post("isMidiLocked: locked out", lockedOut ? "true" : "false");post();
    return lockedOut;
}
isMidiLocked.local = 1;

function commonControlButtonMsgGenerator(key, value) {

    var lockedOut = isMidiLocked();
    key = parseInt(key);
    if (isInitialized && !lockedOut && isProcessingMode()) {
        var maxobj = reqModule.getC4DeviceObj(myCallerName);// caller
        if (maxobj && maxobj.valid) {
            maxobj.js["fromLibrarian"]([MIDI_NOTE_ON_ID, key, BUTTON_PRESSED_VALUE]);// emulate button press event
            //waitMillis(2);
            maxobj.js["fromLibrarian"]([MIDI_NOTE_ON_ID, key, BUTTON_RELEASED_VALUE]);// emulate button release event
            // post("commonControlButtonMsgGenerator: press+release sent for button", key); post();
        } else {
            post("commonControlButtonMsgGenerator: reference maxobj not valid", key);post();
        }
    } else {
        post("commonControlButtonMsgGenerator: midi locked, not processing, or C4Device not present, msg not sent", key);post();
    }
}
commonControlButtonMsgGenerator.local = 1;

function waitMillis(millis) {
    var date = new Date();
    var curDate = null;
    do {
        curDate = new Date();
    }
    while (curDate - date < millis);
}
waitMillis.local = 1;

function commonEncoderButtonMsgGenerator(key, value) {
    commonControlButtonMsgGenerator(key, value);
}
commonEncoderButtonMsgGenerator.local = 1;

// all encoder callback methods defer to this method passing the "raw" (Max object's) data value 0 - 127
function commonEncoderKnobMsgGenerator(key, value) {
    var lockedOut = isMidiLocked();
    if (isInitialized && !lockedOut && isProcessingMode()) {

        if (lastEncoderValues["obj"][key]) {
            var valBefore = lastEncoderValues["obj"][key].getFeedbackValueRaw();
            // no "turn speed" acceleration emulation === too many midi messages too fast?
            var valOut = valBefore > value ? ENCODER_TURN_CCW_OFFSET + 1 : 1;
            // emulate encoder turn event value where CCW turn > 64 and CW < 64 (not a feedback value for led ring)
            var maxobj = reqModule.getC4DeviceObj(myCallerName);// caller
            if (maxobj && maxobj.valid) {
                var encoderId = parseInt(key);
                maxobj.js["fromLibrarian"]([MIDI_CC_ID, encoderId, valOut]);
                // var msg = ["turn increment", valOut, "sent for encoder", key].join(" ");
                // post("commonEncoderKnobMsgGenerator:", msg); post();
                // since we don't get feedback for this message, we need to update the last encoder value, manually
                encodersDict.name = "c4Encoders";
                var pgOffset = reqModule.getPageOffset();
                var encDict = encodersDict.get(encoderId + pgOffset);
                // if this is too fast of a lookup to get the updated data, manually update the "last value" as a "released value"?
                lastEncoderValues["obj"][key].copyDataFromDict(encDict);
            } else {
                post("commonEncoderKnobMsgGenerator: reference maxobj not valid", key);post();
            }
        } else {
            post("commonEncoderKnobMsgGenerator: js object key", key,
                "not in encoder reference collection of size", lastEncoderValues["obj"].length);post();
        }
    } else {
        post("commonEncoderKnobMsgGenerator: midi locked, not processing, or C4Device not present, msg not sent", key);post();
    }
}
commonEncoderKnobMsgGenerator.local = 1;

function copySequenceToPage(a) {
    var args = arrayfromargs(arguments);
    if (args.length > 3) {
        post("copySequenceToPage: called with args:", args[0], args[1], args[2], args[3]); post();
        var maxobj = reqModule.getC4DeviceObj(mySpecialName);// caller
        var maxobj = reqModule.getC4DeviceObj(myCallerName);
        if (maxobj && maxobj.valid) {
            var allDecks = reqModule.getAllControllerDeckNames();
            var sourceDeckName = reqModule.getActiveControllerDeckName();
            var destDeckName = allDecks[args[2]];
            maxobj.js["saveActiveDeck"](sourceDeckName);
            // now the current "active sequence" has been saved from the "active dicts" to the "controller dict"
            // copy current data to local librarian JSON object, then perform copy action on "controller dict" data
        } else {
            post("copySequenceToPage: nothing to save C4Device object not found"); post();
        }
    } else {
        post("copySequenceToPage: not enough args:", args.toString()); post();
    }
}



// function commonButtonDictUpdate(key, value) {
//     buttonsDict.name = "c4Buttons";
//     var valKey = key + "::ledValue";
//     var cntKey = key + "::ledChangeCount";
//     if (isProcessingMode()) {
//         var valBefore = buttonsDict.get(valKey);
//         var cntBefore = buttonsDict.get(cntKey);
//         value = value > 0 ? 127 : 0;
//         buttonsDict.replace(valKey, value);
//         buttonsDict.replace(cntKey, cntBefore + 1);
//         var dtls = ["replaced button led value", valBefore, "with", value, "at", valKey].join(" ");
//         post("commonButtonDictUpdate:", dtls);
//         post();
//         var cntAfter = buttonsDict.get(cntKey)
//         dtls = ["button led change count", cntBefore, "now incremented to", cntAfter, "at", cntKey].join(" ");
//         post("commonButtonDictUpdate:", dtls);
//         post();
//     }
// }
// commonButtonDictUpdate.local = 1;
//
// // this method should be called with a "raw" encoder data value 0 - 127, not a "ring feedback" value
// function commonEncoderDictUpdate(key, value) {
//     encodersDict.name = "c4Encoders";
//     var valKey = key + "::releasedValue";
//     var valBefore = encodersDict.get(valKey);
//     if (isProcessingMode()) {
//         encodersDict.replace(valKey, value);
//         var dtls = ["replaced encoder value", valBefore, "with", value, "at", valKey].join(" ");
//         post("commonEncoderDictUpdate:", dtls);
//         post();
//     }
// }
// commonEncoderDictUpdate.local = 1;

// callback methods

function cbEnb00(data) {
    var key = "32";
    // post("cbEnb00(32): with value", data.value);post();
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb00.local = 1;
function cbEnc00(data) {
    var key = "0";
    // post("cbEnc00: with value", data.value);post();
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc00.local = 1;

function cbEnb01(data) {
    var key = "33";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb01.local = 1;
function cbEnc01(data) {
    var key = "1";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc01.local = 1;

function cbEnb02(data) {
    var key = "34";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb02.local = 1;
function cbEnc02(data) {
    var key = "2";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc02.local = 1;

function cbEnb03(data) {
    var key = "35";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb03.local = 1;
function cbEnc03(data) {
    var key = "3";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc03.local = 1;

function cbEnb04(data) {
    var key = "36";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb04.local = 1;
function cbEnc04(data) {
    var key = "4";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc04.local = 1;

function cbEnb05(data) {
    var key = "37";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb05.local = 1;
function cbEnc05(data) {
    var key = "5";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc05.local = 1;

function cbEnb06(data) {
    var key = "38";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb06.local = 1;
function cbEnc06(data) {
    var key = "6";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc06.local = 1;

function cbEnb07(data) {
    var key = "39";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb07.local = 1;
function cbEnc07(data) {
    var key = "7";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc07.local = 1;

function cbEnb08(data) {
    var key = "40";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb08.local = 1;
function cbEnc08(data) {
    var key = "8";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc08.local = 1;

function cbEnb09(data) {
    var key = "41";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb09.local = 1;
function cbEnc09(data) {
    var key = "9";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc09.local = 1;

function cbEnb10(data) {
    var key = "42";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb10.local = 1;
function cbEnc10(data) {
    var key = "10";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc10.local = 1;

function cbEnb11(data) {
    var key = "43";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb11.local = 1;
function cbEnc11(data) {
    var key = "11";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc11.local = 1;

function cbEnb12(data) {
    var key = "44";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb12.local = 1;
function cbEnc12(data) {
    var key = "12";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc12.local = 1;

function cbEnb13(data) {
    var key = "45";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb13.local = 1;
function cbEnc13(data) {
    var key = "13";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc13.local = 1;

function cbEnb14(data) {
    var key = "46";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb14.local = 1;
function cbEnc14(data) {
    var key = "14";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc14.local = 1;

function cbEnb15(data) {
    var key = "47";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb15.local = 1;
function cbEnc15(data) {
    var key = "15";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc15.local = 1;

function cbEnb16(data) {
    var key = "48";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb16.local = 1;
function cbEnc16(data) {
    var key = "16";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc16.local = 1;

function cbEnb17(data) {
    var key = "49";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb17.local = 1;
function cbEnc17(data) {
    var key = "17";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc17.local = 1;

function cbEnb18(data) {
    var key = "50";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb18.local = 1;
function cbEnc18(data) {
    var key = "18";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc18.local = 1;

function cbEnb19(data) {
    var key = "51";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb19.local = 1;
function cbEnc19(data) {
    var key = "19";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc19.local = 1;

function cbEnb20(data) {
    var key = "52";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb20.local = 1;
function cbEnc20(data) {
    var key = "20";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc20.local = 1;

function cbEnb21(data) {
    var key = "53";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb21.local = 1;
function cbEnc21(data) {
    var key = "21";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc21.local = 1;

function cbEnb22(data) {
    var key = "54";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb22.local = 1;
function cbEnc22(data) {
    var key = "22";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc22.local = 1;

function cbEnb23(data) {
    var key = "55";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb23.local = 1;
function cbEnc23(data) {
    var key = "23";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc23.local = 1;

function cbEnb24(data) {
    var key = "56";
    // commonButtonDictUpdate(key, data.value);
    // post("cbEnb24: with value", data.value);post();
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb24.local = 1;
function cbEnc24(data) {
    var key = "24";
    // commonEncoderDictUpdate(key, data.value);
    // post("cbEnc24: with value", data.value);post();
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc24.local = 1;

function cbEnb25(data) {
    var key = "57";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb25.local = 1;
function cbEnc25(data) {
    var key = "25";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc25.local = 1;

function cbEnb26(data) {
    var key = "58";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb26.local = 1;
function cbEnc26(data) {
    var key = "26";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc26.local = 1;

function cbEnb27(data) {
    var key = "59";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb27.local = 1;
function cbEnc27(data) {
    var key = "27";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc27.local = 1;

function cbEnb28(data) {
    var key = "60";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb28.local = 1;
function cbEnc28(data) {
    var key = "28";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc28.local = 1;

function cbEnb29(data) {
    var key = "61";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb29.local = 1;
function cbEnc29(data) {
    var key = "29";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc29.local = 1;

function cbEnb30(data) {
    var key = "62";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb30.local = 1;
function cbEnc30(data) {
    var key = "30";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc30.local = 1;

function cbEnb31(data) {
    var key = "63";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb31.local = 1;
function cbEnc31(data) {
    var key = "31";
    // commonEncoderDictUpdate(key, data.value);
    commonEncoderKnobMsgGenerator(key, data.value);
}
cbEnc31.local = 1;

// control buttons
// Function Group
// One Split Button addresses 3 LEDs in turn
function cbSplitButton(data) {
    var key = "0";
    // commonButtonDictUpdate(key, data.value);
    commonControlButtonMsgGenerator(key, data.value);
}
cbSplitButton.local = 1;
function cbSplit13(data) {
    var key = "0";
    // commonButtonDictUpdate(key, data.value);
    //commonControlButtonMsgGenerator(key, data.value);
}
cbSplit13.local = 1;
function cbSplit22(data) {
    var key = "1";
    // commonButtonDictUpdate(key, data.value);
    //commonControlButtonMsgGenerator(key, data.value);
}
cbSplit22.local = 1;
function cbSplit31(data) {
    var key = "2";
    // commonButtonDictUpdate(key, data.value);
    //commonControlButtonMsgGenerator(key, data.value);
}
cbSplit31.local = 1;
function cbLock(data) {
    var key = "3";
    // commonButtonDictUpdate(key, data.value);
    commonControlButtonMsgGenerator(key, data.value);
}
cbLock.local = 1;
function cbSpotErase(data) {
    var key = "4";
    // commonButtonDictUpdate(key, data.value);
    commonControlButtonMsgGenerator(key, data.value);
}
cbSpotErase.local = 1;

// Assignment Group
function cbMarker(data) {
    var key = "5";
    // commonButtonDictUpdate(key, data.value);
    commonControlButtonMsgGenerator(key, data.value);
}
cbMarker.local = 1;
function cbTrack(data) {
    var key = "6";
    // commonButtonDictUpdate(key, data.value);
    commonControlButtonMsgGenerator(key, data.value);
}
cbTrack.local = 1;
function cbChStrip(data) {
    var key = "7";
    // commonButtonDictUpdate(key, data.value);
    commonControlButtonMsgGenerator(key, data.value);
}
cbChStrip.local = 1;
function cbFunction(data) {
    var key = "8";
    // commonButtonDictUpdate(key, data.value);
    commonControlButtonMsgGenerator(key, data.value);
}
cbFunction.local = 1;

// Parameter Group
function cbBankL(data) {
    var key = "9";
    // commonButtonDictUpdate(key, data.value);
    commonControlButtonMsgGenerator(key, data.value);
}
cbBankL.local = 1;
function cbBankR(data) {
    var key = "10";
    // commonButtonDictUpdate(key, data.value);
    commonControlButtonMsgGenerator(key, data.value);
}
cbBankR.local = 1;
function cbStepL(data) {
    var key = "11";
    // commonButtonDictUpdate(key, data.value);
    commonControlButtonMsgGenerator(key, data.value);
}
cbStepL.local = 1;
function cbStepR(data) {
    var key = "12";
    // commonButtonDictUpdate(key, data.value);
    commonControlButtonMsgGenerator(key, data.value);
}
cbStepR.local = 1;

// Modifiers Group
function cbShift(data) {
    var key = "13";
    // commonButtonDictUpdate(key, data.value);
    commonControlButtonMsgGenerator(key, data.value);
}
cbShift.local = 1;
function cbOption(data) {
    var key = "14";
    // commonButtonDictUpdate(key, data.value);
    commonControlButtonMsgGenerator(key, data.value);
}
cbOption.local = 1;
function cbControl(data) {
    var key = "15";
    // commonButtonDictUpdate(key, data.value);
    commonControlButtonMsgGenerator(key, data.value);
}
cbControl.local = 1;
function cbAlt(data) {
    var key = "16";
    // commonButtonDictUpdate(key, data.value);
    commonControlButtonMsgGenerator(key, data.value);
}
cbAlt.local = 1;

// "session" Group
function cbSlotUp(data) {
    var key = "17";
    // commonButtonDictUpdate(key, data.value);
    commonControlButtonMsgGenerator(key, data.value);
}
cbSlotUp.local = 1;
function cbSlotDn(data) {
    var key = "18";
    // commonButtonDictUpdate(key, data.value);
    commonControlButtonMsgGenerator(key, data.value);
}
cbSlotDn.local = 1;
function cbTrackL(data) {
    var key = "19";
    // commonButtonDictUpdate(key, data.value);
    commonControlButtonMsgGenerator(key, data.value);
}
cbTrackL.local = 1;
function cbTrackR(data) {
    var key = "20";
    // commonButtonDictUpdate(key, data.value);
    commonControlButtonMsgGenerator(key, data.value);
}
cbTrackR.local = 1;


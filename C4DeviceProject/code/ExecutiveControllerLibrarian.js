

include("Consts.js");
include("C4Button.js");
include("C4Encoder.js");
include("C4DeviceController.js");

inlets = 1;
// out 0 === "normal" midi feedback msg to C4 (from this librarian)
// out 1 === "emulated C4" midi msg feed to C4Device.js
outlets = 2;


var utilEncoder = new C4Encoder();
var utilButton = new C4Button();
var librarian = new C4DeviceController("single");

// scriptnewdefault js example
// maxobjectlistener js example
var lastEncoderValues = {};
var functionButtonIndex = 8;// no LEDs for Modifiers, Parameter, nor Session Control buttons


// "this" librarian and "this" deviceController are meant to be instances of the same C4DeviceController JSON object
// backed by the one "executiveController" Max-js Dict object (which "has" the same JSON structure)
// changes in either "this" instance are NOT reflected in the "other this" instance until
// "synchronized" via the "executiveController" Dict (database)
// change "this", update db, update "other this" (from db)
// In other words the Max Dictionary objects are treated like the "application" database
function init() {
    gc();// remove any existing before adding new


    c4DeviceControllerDict.name = "C4DeviceExecutiveController";
    librarian = librarian.newFromDict(c4DeviceControllerDict);
    lastEncoderValues = {};

    var obj = this.patcher.getnamed("enb00");
    new MaxobjListener(obj, cbEnb00);
    obj = this.patcher.getnamed("enc00");
    new MaxobjListener(obj, cbEnc00);
    lastEncoderValues["0"] = new C4Encoder(0);
    obj = this.patcher.getnamed("enb01");
    new MaxobjListener(obj, cbEnb01);
    obj = this.patcher.getnamed("enc01");
    new MaxobjListener(obj, cbEnc01);
    lastEncoderValues["1"] = new C4Encoder(1);
    obj = this.patcher.getnamed("enb02");
    new MaxobjListener(obj, cbEnb02);
    obj = this.patcher.getnamed("enc02");
    new MaxobjListener(obj, cbEnc02);
    lastEncoderValues["2"] = new C4Encoder(2);
    obj = this.patcher.getnamed("enb03");
    new MaxobjListener(obj, cbEnb03);
    obj = this.patcher.getnamed("enc03");
    new MaxobjListener(obj, cbEnc03);
    lastEncoderValues["3"] = new C4Encoder(3);
    obj = this.patcher.getnamed("enb04");
    new MaxobjListener(obj, cbEnb04);
    obj = this.patcher.getnamed("enc04");
    new MaxobjListener(obj, cbEnc04);
    lastEncoderValues["4"] = new C4Encoder(4);
    obj = this.patcher.getnamed("enb05");
    new MaxobjListener(obj, cbEnb05);
    obj = this.patcher.getnamed("enc05");
    new MaxobjListener(obj, cbEnc05);
    lastEncoderValues["5"] = new C4Encoder(5);
    obj = this.patcher.getnamed("enb06");
    new MaxobjListener(obj, cbEnb06);
    obj = this.patcher.getnamed("enc06");
    new MaxobjListener(obj, cbEnc06);
    lastEncoderValues["6"] = new C4Encoder(6);
    obj = this.patcher.getnamed("enb07");
    new MaxobjListener(obj, cbEnb07);
    obj = this.patcher.getnamed("enc07");
    new MaxobjListener(obj, cbEnc07);
    lastEncoderValues["7"] = new C4Encoder(7);

    obj = this.patcher.getnamed("enb08");
    new MaxobjListener(obj, cbEnb08);
    obj = this.patcher.getnamed("enc08");
    new MaxobjListener(obj, cbEnc08);
    lastEncoderValues["8"] = new C4Encoder(8);
    obj = this.patcher.getnamed("enb09");
    new MaxobjListener(obj, cbEnb09);
    obj = this.patcher.getnamed("enc09");
    new MaxobjListener(obj, cbEnc09);
    lastEncoderValues["9"] = new C4Encoder(9);
    obj = this.patcher.getnamed("enb10");
    new MaxobjListener(obj, cbEnb10);
    obj = this.patcher.getnamed("enc10");
    new MaxobjListener(obj, cbEnc10);
    lastEncoderValues["10"] = new C4Encoder(10);
    obj = this.patcher.getnamed("enb11");
    new MaxobjListener(obj, cbEnb11);
    obj = this.patcher.getnamed("enc11");
    new MaxobjListener(obj, cbEnc11);
    lastEncoderValues["11"] = new C4Encoder(11);
    obj = this.patcher.getnamed("enb12");
    new MaxobjListener(obj, cbEnb12);
    obj = this.patcher.getnamed("enc12");
    new MaxobjListener(obj, cbEnc12);
    lastEncoderValues["12"] = new C4Encoder(12);
    obj = this.patcher.getnamed("enb13");
    new MaxobjListener(obj, cbEnb13);
    obj = this.patcher.getnamed("enc13");
    new MaxobjListener(obj, cbEnc13);
    lastEncoderValues["13"] = new C4Encoder(13);
    obj = this.patcher.getnamed("enb14");
    new MaxobjListener(obj, cbEnb14);
    obj = this.patcher.getnamed("enc14");
    new MaxobjListener(obj, cbEnc14);
    lastEncoderValues["14"] = new C4Encoder(14);
    obj = this.patcher.getnamed("enb15");
    new MaxobjListener(obj, cbEnb15);
    obj = this.patcher.getnamed("enc15");
    new MaxobjListener(obj, cbEnc15);
    lastEncoderValues["15"] = new C4Encoder(15);

    obj = this.patcher.getnamed("enb16");
    new MaxobjListener(obj, cbEnb16);
    obj = this.patcher.getnamed("enc16");
    new MaxobjListener(obj, cbEnc16);
    lastEncoderValues["16"] = new C4Encoder(16);
    obj = this.patcher.getnamed("enb17");
    new MaxobjListener(obj, cbEnb17);
    obj = this.patcher.getnamed("enc17");
    new MaxobjListener(obj, cbEnc17);
    lastEncoderValues["17"] = new C4Encoder(17);
    obj = this.patcher.getnamed("enb18");
    new MaxobjListener(obj, cbEnb18);
    obj = this.patcher.getnamed("enc18");
    new MaxobjListener(obj, cbEnc18);
    lastEncoderValues["18"] = new C4Encoder(18);
    obj = this.patcher.getnamed("enb19");
    new MaxobjListener(obj, cbEnb19);
    obj = this.patcher.getnamed("enc19");
    new MaxobjListener(obj, cbEnc19);
    lastEncoderValues["19"] = new C4Encoder(19);
    obj = this.patcher.getnamed("enb20");
    new MaxobjListener(obj, cbEnb20);
    obj = this.patcher.getnamed("enc20");
    new MaxobjListener(obj, cbEnc20);
    lastEncoderValues["20"] = new C4Encoder(20);
    obj = this.patcher.getnamed("enb21");
    new MaxobjListener(obj, cbEnb21);
    obj = this.patcher.getnamed("enc21");
    new MaxobjListener(obj, cbEnc21);
    lastEncoderValues["21"] = new C4Encoder(21);
    obj = this.patcher.getnamed("enb22");
    new MaxobjListener(obj, cbEnb22);
    obj = this.patcher.getnamed("enc22");
    new MaxobjListener(obj, cbEnc22);
    lastEncoderValues["22"] = new C4Encoder(22);
    obj = this.patcher.getnamed("enb23");
    new MaxobjListener(obj, cbEnb23);
    obj = this.patcher.getnamed("enc23");
    new MaxobjListener(obj, cbEnc23);
    lastEncoderValues["23"] = new C4Encoder(23);

    obj = this.patcher.getnamed("enb24");
    new MaxobjListener(obj, cbEnb24);
    obj = this.patcher.getnamed("enc24");
    new MaxobjListener(obj, cbEnc24);
    lastEncoderValues["24"] = new C4Encoder(24);
    obj = this.patcher.getnamed("enb25");
    new MaxobjListener(obj, cbEnb25);
    obj = this.patcher.getnamed("enc25");
    new MaxobjListener(obj, cbEnc25);
    lastEncoderValues["25"] = new C4Encoder(25);
    obj = this.patcher.getnamed("enb26");
    new MaxobjListener(obj, cbEnb26);
    obj = this.patcher.getnamed("enc26");
    new MaxobjListener(obj, cbEnc26);
    lastEncoderValues["26"] = new C4Encoder(26);
    obj = this.patcher.getnamed("enb27");
    new MaxobjListener(obj, cbEnb27);
    obj = this.patcher.getnamed("enc27");
    new MaxobjListener(obj, cbEnc27);
    lastEncoderValues["27"] = new C4Encoder(27);
    obj = this.patcher.getnamed("enb28");
    new MaxobjListener(obj, cbEnb28);
    obj = this.patcher.getnamed("enc28");
    new MaxobjListener(obj, cbEnc28);
    lastEncoderValues["28"] = new C4Encoder(28);
    obj = this.patcher.getnamed("enb29");
    new MaxobjListener(obj, cbEnb29);
    obj = this.patcher.getnamed("enc29");
    new MaxobjListener(obj, cbEnc29);
    lastEncoderValues["29"] = new C4Encoder(29);
    obj = this.patcher.getnamed("enb30");
    new MaxobjListener(obj, cbEnb30);
    obj = this.patcher.getnamed("enc30");
    new MaxobjListener(obj, cbEnc30);
    lastEncoderValues["30"] = new C4Encoder(30);
    obj = this.patcher.getnamed("enb31");
    new MaxobjListener(obj, cbEnb31);
    obj = this.patcher.getnamed("enc31");
    new MaxobjListener(obj, cbEnc31);
    lastEncoderValues["31"] = new C4Encoder(31);


    obj = this.patcher.getnamed("SplitButton");
    new MaxobjListener(obj, cbSplitButton);
    obj = this.patcher.getnamed("Split13");
    new MaxobjListener(obj, cbSplit13);
    obj = this.patcher.getnamed("Split22");
    new MaxobjListener(obj, cbSplit22);
    obj = this.patcher.getnamed("Split31");
    new MaxobjListener(obj, cbSplit31);
    obj = this.patcher.getnamed("Lock");
    new MaxobjListener(obj, cbLock);
    obj = this.patcher.getnamed("SpotErase");
    new MaxobjListener(obj, cbSpotErase);

    obj = this.patcher.getnamed("Marker");
    new MaxobjListener(obj, cbMarker);
    obj = this.patcher.getnamed("Track");
    new MaxobjListener(obj, cbTrack);
    obj = this.patcher.getnamed("ChStrip");
    new MaxobjListener(obj, cbChStrip);
    obj = this.patcher.getnamed("Function");
    new MaxobjListener(obj, cbFunction);

    obj = this.patcher.getnamed("BankL");
    new MaxobjListener(obj, cbBankL);
    obj = this.patcher.getnamed("BankR");
    new MaxobjListener(obj, cbBankR);
    obj = this.patcher.getnamed("StepL");
    new MaxobjListener(obj, cbStepL);
    obj = this.patcher.getnamed("StepR");
    new MaxobjListener(obj, cbStepR);

    obj = this.patcher.getnamed("Shift");
    new MaxobjListener(obj, cbShift);
    obj = this.patcher.getnamed("Option");
    new MaxobjListener(obj, cbOption);
    obj = this.patcher.getnamed("Control");
    new MaxobjListener(obj, cbControl);
    obj = this.patcher.getnamed("Alt");
    new MaxobjListener(obj, cbAlt);

    obj = this.patcher.getnamed("SlotUp");
    new MaxobjListener(obj, cbSlotUp);
    obj = this.patcher.getnamed("SlotDn");
    new MaxobjListener(obj, cbSlotDn);
    obj = this.patcher.getnamed("TrackL");
    new MaxobjListener(obj, cbTrackL);
    obj = this.patcher.getnamed("TrackR");
    new MaxobjListener(obj, cbTrackR);
}

var midiProcessingLock = false; // === 0 = unlocked, > 0 = locked
midiProcessingLock.local = 1;
function midievent(midiMsgIn) {
    // these incoming midi events are copies of the actual feedback messages going to the actual C4 from C4Device.js
    // Lock the patcher elements from processing "Max Object Listener" events while this method runs because calling
    // the "set" method here does not trigger output but does trigger "listener events" which causes a feedback loop.

    encodersDict.name = "c4Encoders";
    buttonsDict.name = "c4Buttons";
    c4DeviceControllerDict.name = "C4DeviceExecutiveController";
    var MIDI_MSG_SIZE = 3;

    if (isProcessingMode()) {
        // Calling "set" below triggers listener callbacks that, unless midi processing is locked here,
        // send midi messages (to C4Device.js) that "feed back" here again, looping endlessly
        midiProcessingLock = true;
        var midiMsg = arrayfromargs(arguments);
        var unwoundMsgs = unwindMessages(midiMsg);
        for (var i = 0; i < unwoundMsgs.length; i++) {
            var unwoundMsg = unwoundMsgs[i];
            //post("midievent: processing event ", unwoundMsg); post();
            if (!(unwoundMsg.length === MIDI_MSG_SIZE || isSysexMsg(unwoundMsg))) {
                post("midievent: assumption issue, unexpected unwoundMsg length, ignoring", unwoundMsg); post();
            } else {
                var ledOFF = unwoundMsg[2] < ENCODER_RING_BTN_LED_ON_OFFSET;
                var ledVal = ledOFF ? 0 : 1
                var feedbackId = unwoundMsg[1];
                var ringFdbk = isEncoderRingFeedbackMsg(unwoundMsg);
                var controlFdbk = isControlButtonFeedbackMsg(unwoundMsg);
                if (ringFdbk) {
                    // update the "librarian UI" to reflect the feedback data received
                    var encoderId = feedbackId - ENCODER_FEEDBACK_ID_OFFSET;
                    var encDict = encodersDict.get(encoderId);
                    var eventEncoder = utilEncoder.newFromDict(encDict);
                    var feedbackValue = eventEncoder.getFeedbackValueRaw();

                    var encKey = ("00" + encoderId).slice(-2);
                    var btn = this.patcher.getnamed("enb" + encKey);
                    if (btn.understands("set")) {
                        btn["set"](ledVal);
                    } else {
                        var msg = [btn, "doesn't understand 'set'. ledValue", ledVal, "ignored"].join(" ");
                        post("midievent:", msg); post();
                    }
                    var enc = this.patcher.getnamed("enc" + encKey);
                    var encId = encoderId.toString();
                    if (enc.understands("set")) {
                        enc["set"](feedbackValue);
                        lastEncoderValues[encId].copyDataFrom(eventEncoder);
                    } else {
                        var msg = [enc, "doesn't understand 'set'. feedbackValue", feedbackValue, "ignored"].join(" ");
                        post("midievent:", msg); post();
                    }
                } else if (controlFdbk) {
                    var btn = getPatcherControlButton(feedbackId);
                    if (btn !== undefined) {
                        if (feedbackId <= functionButtonIndex && !(feedbackId in [3, 4])) {
                            // page or deck change button feedback, reload "last encoders" from (new) current dict
                            // sometimes the deck doesn't actually change (precedence rules), but refreshing "last encoders"
                            // here anyway doesn't hurt
                            for (var s = 0; s < NBR_PHYSICAL_ENCODERS; s++) {
                                var pageOffset = reqModule.getPageOffset();
                                var encDict = encodersDict.get(s + pageOffset);
                                var eventEncoder = utilEncoder.newFromDict(encDict);
                                var encKey = ("00" + s).slice(-2);
                                var enc = this.patcher.getnamed("enc" + encKey);
                                if (enc.understands("set")) {
                                    enc["set"](eventEncoder.getFeedbackValueRaw());
                                    lastEncoderValues[s.toString()].copyDataFrom(eventEncoder);
                                } else {
                                    var msg = [enc, "doesn't understand 'set'. stored encoder data",
                                        eventEncoder.getFeedbackValueRaw(), "ignored"].join(" ");
                                    post("midievent:", msg); post();
                                }
                            }
                        } else  if (feedbackId > functionButtonIndex && feedbackId < EXTERNAL_TRANSPORT_STATUS_SIGNAL_ID) {
                            // no physical LED for these physical control buttons, but C4Device.js processes all c4 button
                            // messages the same way so these (physically missing) patcher leds "function" in press+release
                            // pairs like all the other button leds where the button is in effect only when the led is ON.
                            // However, these buttons without a physical led always trigger their effect regardless of
                            // "their" led state.  Modifier buttons matter whether they are pressed or released, Parameter and
                            // Session buttons always trigger their actions. It's just this librarian UI that looks goofy,
                            // but it reflects the incongruous underlying state of the data.
                            // ledVal = unwoundMsg[2];
                        }
                        if (btn.understands("set")) {
                            btn["set"](ledVal);
                        } else {
                            var msg = [btn, "doesn't understand 'set'. ledValue", ledVal, "ignored"].join(" ");
                            post("midievent:", msg); post();
                        }
                    } else {//
                        var msg = ["button for feedbackId", feedbackId, "is undefined"].join(" ");
                        post("midievent:", msg); post();
                    }
                }
                // else ignore
            }
        }
        midiProcessingLock = false;
    }
    // else not "processing mode"
}

function unwindMessages(midiMsg) {
    // example arrays to unwind: [rtn0, sysexTop00, sysexTop01, sysexTop02, sysexTop03, rtnZ];
    // groups of 32 CC messages and 9 Note messages need to get unwound
    // sysex messages can be ignored
    var MIDI_MSG_SIZE = 3;
    var rtn = [];
    //post("unwindMessages: ", midiMsg, "begins", midiMsg[0], "and length", midiMsg.length); post();
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
        post("unwindMessages: unexpected nested array element depth, recursion?", midiMsg); post();
        for (var k = 0; k < midiMsg.length; k++) {
            post("unwindMessages: unwinding", midiMsg[k]); post();
            rtn.push(unwindMessages(midiMsg[k]));
        }
    }
    return rtn;
}

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

function getPatcherControlButton(feedbackId) {
    var btn = this.patcher.getnamed("Split13");
    switch (feedbackId) {
        case 0: break;// btn = this.patcher.getnamed("Split13"); break;
        case 1: btn = this.patcher.getnamed("Split22"); break;
        case 2: btn = this.patcher.getnamed("Split31"); break;
        case 3: btn = this.patcher.getnamed("Lock"); break;
        case 4: btn = this.patcher.getnamed("SpotErase"); break;
        case 5: btn = this.patcher.getnamed("Marker"); break;
        case 6: btn = this.patcher.getnamed("Track"); break;
        case 7: btn = this.patcher.getnamed("ChStrip"); break;
        case 8: btn = this.patcher.getnamed("Function"); break;
        case 9: btn = this.patcher.getnamed("BankL"); break;
        case 10: btn = this.patcher.getnamed("BankR"); break;
        case 11: btn = this.patcher.getnamed("StepL"); break;
        case 12: btn = this.patcher.getnamed("StepR"); break;
        case 13: btn = this.patcher.getnamed("Shift"); break;
        case 14: btn = this.patcher.getnamed("Option"); break;
        case 15: btn = this.patcher.getnamed("Control"); break;
        case 16: btn = this.patcher.getnamed("Alt"); break;
        case 17: btn = this.patcher.getnamed("SlotUp"); break;
        case 18: btn = this.patcher.getnamed("SlotDn"); break;
        case 19: btn = this.patcher.getnamed("TrackL"); break;
        case 20: btn = this.patcher.getnamed("TrackR"); break;
        // case 21: btn = this.patcher.getnamed("ExTrsp"); break;// external transport active signal
        // case 22: btn = this.patcher.getnamed("GateOn"); break;// midi processing active signal
        // case 23: btn = this.patcher.getnamed("Verbos"); break;// sequencer verbose mode active signal
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
    var MIDI_MSG_SIZE = 3;
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
    var MIDI_MSG_SIZE = 3;
    var isButton = midiMsg[1] < ENCODER_FEEDBACK_ID_OFFSET && (midiMsg[0] === MIDI_NOTE_ON_ID || midiMsg[0] === MIDI_NOTE_OFF_ID);
    return midiMsg.length === MIDI_MSG_SIZE && isButton;
}
isControlButtonFeedbackMsg.local = 1;

function isSysexFeedback(midiMsg) {
    return midiMsg[0] === MIDI_SYSEX_START_ID && midiMsg[-1] === MIDI_SYSEX_END_ID;
}
isSysexFeedback.local = 1;

function isProcessingMode() {
    var btnDict = buttonsDict.get(PROCESSING_BYPASS_SIGNAL_ID);
    if (btnDict) {
        var bypassBtn = utilButton.newFromDict(btnDict);
        if (bypassBtn) {
            return !bypassBtn.isBypassed();// processing when not bypassed
        }
    }
    return false;// not processing by default
}
isProcessingMode.local = 1;

function commonControlButtonMsgGenerator(key, value) {
    if (!midiProcessingLock && isProcessingMode()) {
        outlet(1, [MIDI_NOTE_ON_ID, key, BUTTON_PRESSED_VALUE]);// emulate button press event
        //waitMillis(2);
        outlet(1, [MIDI_NOTE_ON_ID, key, BUTTON_RELEASED_VALUE]);// emulate button release event
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

    if (!midiProcessingLock && isProcessingMode()) {
        var valBefore = lastEncoderValues[key].getFeedbackValueRaw();
        // no "turn speed" acceleration emulation === too many midi messages too fast?
        var valOut = valBefore > value ? ENCODER_TURN_CCW_OFFSET + 1 : 1;
        outlet(1, [MIDI_CC_ID, key, valOut]);// emulate encoder turn event value where CCW turn > 64 and CW < 64
    }
}
commonEncoderKnobMsgGenerator.local = 1;


function commonButtonDictUpdate(key, value) {
    buttonsDict.name = "c4Buttons";
    var valKey = key + "::ledValue";
    var cntKey = key + "::ledChangeCount";
    if (isProcessingMode()) {
        var valBefore = buttonsDict.get(valKey);
        var cntBefore = buttonsDict.get(cntKey);
        value = value > 0 ? 127 : 0;
        buttonsDict.replace(valKey, value);
        buttonsDict.replace(cntKey, cntBefore + 1);
        var dtls = ["replaced button led value", valBefore, "with", value, "at", valKey].join(" ");
        post("commonButtonDictUpdate:", dtls);
        post();
        var cntAfter = buttonsDict.get(cntKey)
        dtls = ["button led change count", cntBefore, "now incremented to", cntAfter, "at", cntKey].join(" ");
        post("commonButtonDictUpdate:", dtls);
        post();
    }
}
commonButtonDictUpdate.local = 1;

// this method should be called with a "raw" encoder data value 0 - 127, not a "ring feedback" value
function commonEncoderDictUpdate(key, value) {
    encodersDict.name = "c4Encoders";
    var valKey = key + "::releasedValue";
    var valBefore = encodersDict.get(valKey);
    if (isProcessingMode()) {
        encodersDict.replace(valKey, value);
        var dtls = ["replaced encoder value", valBefore, "with", value, "at", valKey].join(" ");
        post("commonEncoderDictUpdate:", dtls);
        post();
    }
}
commonEncoderDictUpdate.local = 1;

// callback methods

function cbEnb00(data) {
    var key = "32";
    // commonButtonDictUpdate(key, data.value);
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb00.local = 1;
function cbEnc00(data) {
    var key = "0";
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
    commonEncoderButtonMsgGenerator(key, data.value);
}
cbEnb24.local = 1;
function cbEnc24(data) {
    var key = "24";
    // commonEncoderDictUpdate(key, data.value);
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


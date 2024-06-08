
//
//
//   ---- C4Encoder function object definitions -----
//
//


function C4Encoder(idx, nm, pv, rv, ringStyle, btnLedVal, spv, opv, cpv, apv, liv) {
    this.index = idx !== undefined ? idx : 0;
    this.name = nm !== undefined ? nm.trim() : "000";// 000 - 127
    this.pressedValue = pv !== undefined ? pv : 0;
    this.releasedValue = rv!== undefined ? rv : 0;
    this.ringLedFeedbackStyle = ringStyle !== undefined ? ringStyle : "single";// "Single Dot" style by default
    this.buttonLedValue = btnLedVal !== undefined ? btnLedVal : 0; // LED is OFF by default
    this.shiftPressedValue = spv !== undefined ? spv : 0;
    this.optionPressedValue = opv !== undefined ? opv : 0;
    this.controlPressedValue = cpv !== undefined ? cpv : 0;
    this.altPressedValue = apv !== undefined ? apv : 0;
    this.lastIncrementValue = liv !== undefined ? liv : 0;
    this.setMyName();
}
C4Encoder.prototype.setMyName = function() {
    this.name = setFormattedName(this.name, "ENC");
};

C4Encoder.prototype.newFromJSON = function(s) {
    var enc = JSON.parse(s);
    return new C4Encoder(enc.index, enc.name, enc.pressedValue, enc.releasedValue,
        enc.ringLedFeedbackStyle, enc.buttonLedValue, enc.shiftPressedValue,
        enc.optionPressedValue, enc.controlPressedValue, enc.altPressedValue, enc.lastIncrementValue);
};
C4Encoder.prototype.newFromDict = function(d) {
    return new C4Encoder(d.get("index"), d.get("name"), d.get("pressedValue"), d.get("releasedValue"),
        d.get("ringLedFeedbackStyle"), d.get("buttonLedValue"), d.get("shiftPressedValue"),
        d.get("optionPressedValue"), d.get("controlPressedValue"), d.get("altPressedValue"), d.get("lastIncrementValue"));
};
C4Encoder.prototype.toJsonObj = function() {
    return JSON.stringify(this);
};
C4Encoder.prototype.copyDataFrom = function(other) {
    this.pressedValue = other.pressedValue;
    this.releasedValue = other.releasedValue;
    this.ringLedFeedbackStyle = other.ringLedFeedbackStyle;
    this.buttonLedValue = other.buttonLedValue;
    this.shiftPressedValue = other.shiftPressedValue;
    this.optionPressedValue = other.optionPressedValue;
    this.controlPressedValue = other.controlPressedValue;
    this.altPressedValue = other.altPressedValue;
    this.lastIncrementValue = other.lastIncrementValue;
};
C4Encoder.prototype.updateMyDict = function() {
    encodersDict.name = "c4Encoders";
    encBtnReleasedStateDict.name = "encoderBtnReleasedData";
    encBtnPressedStateDict.name = "encoderBtnPressedData";
    var replaceKey = this.index + "::pressedValue";
    encodersDict.replace(replaceKey, this.pressedValue);
    replaceKey = this.index + "::releasedValue";
    encodersDict.replace(replaceKey, this.releasedValue);
    replaceKey = this.index + "::ringLedFeedbackStyle";
    encodersDict.replace(replaceKey, this.ringLedFeedbackStyle);
    replaceKey = this.index + "::buttonLedValue";
    encodersDict.replace(replaceKey, this.buttonLedValue);
    replaceKey = this.index + "::shiftPressedValue";
    encodersDict.replace(replaceKey, this.shiftPressedValue);
    replaceKey = this.index + "::optionPressedValue";
    encodersDict.replace(replaceKey, this.optionPressedValue);
    replaceKey = this.index + "::controlPressedValue";
    encodersDict.replace(replaceKey, this.controlPressedValue);
    replaceKey = this.index + "::altPressedValue";
    encodersDict.replace(replaceKey, this.altPressedValue);
    replaceKey = this.index + "::lastIncrementValue";
    encodersDict.replace(replaceKey, this.lastIncrementValue);

    encBtnReleasedStateDict.set(this.index, this.releasedValue);
    encBtnPressedStateDict.set(this.index, this.pressedValue);
};
// local js "pointer" Dict
var pressedOrReleased = new Dict();

C4Encoder.prototype.processIncrement = function(ccVal) {
    encodersDict.name = "c4Encoders";

    // inbound counter-clockwise movement data becomes negative, 65 becomes -1
    ccVal = ccVal < 65 ? ccVal : 64 - ccVal;
    
    var shiftPriority = this.isShiftButtonPressed();
    var optionPriority = this.isOptionButtonPressed();
    var controlPriority = this.isControlButtonPressed();
    var altPriority = this.isAltButtonPressed();
    if (shiftPriority) {
        var key = this.index + "::shiftPressedValue";
        var oldShiftPressedValue = encodersDict.get(key);
        var newShiftPressedValue = this.massageIncrement(ccVal, oldShiftPressedValue);
        if (newShiftPressedValue !== oldShiftPressedValue) {
            this.shiftPressedValue = newShiftPressedValue;
            encodersDict.replace(key, this.shiftPressedValue);
        }
    } else if (optionPriority) {
        key = this.index + "::optionPressedValue";
        var oldOptionPressedValue = encodersDict.get(key);
        var newOptionPressedValue = this.massageIncrement(ccVal, oldOptionPressedValue);
        if (newOptionPressedValue !== oldOptionPressedValue) {
            this.optionPressedValue = newOptionPressedValue;
            encodersDict.replace(key, this.optionPressedValue);
        }
    } else if (controlPriority) {
        key = this.index + "::controlPressedValue";
        var oldControlPressedValue = encodersDict.get(key);
        var newControlPressedValue = this.massageIncrement(ccVal, oldControlPressedValue);
        if (newControlPressedValue !== oldControlPressedValue) {
            this.controlPressedValue = newControlPressedValue;
            encodersDict.replace(key, this.controlPressedValue);
        }
    } else if (altPriority) {
        key = this.index + "::altPressedValue";
        var oldAltPressedValue = encodersDict.get(key);
        var newAltPressedValue = this.massageIncrement(ccVal, oldAltPressedValue);
        if (newAltPressedValue !== oldAltPressedValue) {
            this.altPressedValue = newAltPressedValue;
            encodersDict.replace(key, this.altPressedValue);
        }
    } else {

        var pressed = this.isButtonPressed();
        var ccNbr = this.index;
        pressedOrReleased.name = this.getActiveEncDictName();
        var oldDialValue = pressedOrReleased.get(ccNbr);
        var newDialValue = this.massageIncrement(ccVal, oldDialValue);
        if (newDialValue !== oldDialValue) {
            pressedOrReleased.set(ccNbr, newDialValue);
            if (pressed) {
                this.pressedValue = pressedOrReleased.get(ccNbr);
                var replaceKey = this.index + "::pressedValue";
                encodersDict.replace(replaceKey, this.pressedValue);
            } else {
                this.releasedValue = pressedOrReleased.get(ccNbr);
                replaceKey = this.index + "::releasedValue";
                encodersDict.replace(replaceKey, this.releasedValue);
            }
        }
    }
    this.lastIncrementValue = ccVal;
    replaceKey = this.index + "::lastIncrementValue";
    encodersDict.replace(replaceKey, this.lastIncrementValue);
    return [this.getFeedbackId(), this.getFeedbackValueForRingStyle(), this.lastIncrementValue];
};

C4Encoder.prototype.massageIncrement = function(increment, currentValue) {
    var rtnVal = increment + currentValue;
    if (rtnVal > BUCKET_FULL_VALUE) {
        rtnVal = BUCKET_FULL_VALUE;
    } else if (rtnVal < BUCKET_EMPTY_VALUE) {
        rtnVal = BUCKET_EMPTY_VALUE;
    }
    return rtnVal;
};

C4Encoder.prototype.isShiftButtonPressed = function() {
    buttonsDict.name = "c4Buttons";
    btnStateDict.name = "buttonStateChangeCount";
    var shiftBtnId = 13;
    var isPressed = buttonsDict.get(shiftBtnId.toString() + "::pressedValue");// 0 or 127
    var pressedToo = btnStateDict.get(shiftBtnId) % 2;// 0 or 1 (because counting)
    if (!((isPressed === 0 && pressedToo === 0)||(isPressed === 127 && pressedToo === 1))) {
        post("C4Encoder.prototype.isShiftButtonPressed: dict button pressed sync issue", isPressed, pressedToo); post();
    }
    return isPressed;
};
C4Encoder.prototype.isOptionButtonPressed = function() {
    buttonsDict.name = "c4Buttons";
    btnStateDict.name = "buttonStateChangeCount";
    var optionBtnId = 14;
    var isPressed = buttonsDict.get(optionBtnId.toString() + "::pressedValue");// 0 or 127
    var pressedToo = btnStateDict.get(optionBtnId) % 2;// 0 or 1 (because counting)
    if (!((isPressed === 0 && pressedToo === 0)||(isPressed === 127 && pressedToo === 1))) {
        post("C4Encoder.prototype.isOptionButtonPressed: dict button pressed sync issue", isPressed, pressedToo); post();
    }
    return isPressed;
};
C4Encoder.prototype.isControlButtonPressed = function() {
    buttonsDict.name = "c4Buttons";
    btnStateDict.name = "buttonStateChangeCount";
    var controlBtnId = 15;
    var isPressed = buttonsDict.get(controlBtnId.toString() + "::pressedValue");// 0 or 127
    var pressedToo = btnStateDict.get(controlBtnId) % 2;// 0 or 1 (because counting)
    if (!((isPressed === 0 && pressedToo === 0)||(isPressed === 127 && pressedToo === 1))) {
        post("C4Encoder.prototype.isControlButtonPressed: dict button pressed sync issue", isPressed, pressedToo); post();
    }
    return isPressed;
};
C4Encoder.prototype.isAltButtonPressed = function() {
    buttonsDict.name = "c4Buttons";
    btnStateDict.name = "buttonStateChangeCount";
    var altBtnId = 16;
    var isPressed = buttonsDict.get(altBtnId.toString() + "::pressedValue");// 0 or 127
    var pressedToo = btnStateDict.get(altBtnId) % 2;// 0 or 1 (because counting)
    if (!((isPressed === 0 && pressedToo === 0)||(isPressed === 127 && pressedToo === 1))) {
        post("C4Encoder.prototype.isAltButtonPressed: dict button pressed sync issue", isPressed, pressedToo); post();
    }
    return isPressed;
};
C4Encoder.prototype.isButtonPressed = function() {
    btnStateDict.name = "buttonStateChangeCount";
    return btnStateDict.get(this.index + ENCODER_BTN_OFFSET) % 2;// return 1 when encoder button "is pressed"
};
C4Encoder.prototype.isButtonLedON = function() {
    ledStateDict.name = "ledStateChangeCount";
    return ledStateDict.get(this.index + ENCODER_BTN_OFFSET) % 2;
};
C4Encoder.prototype.getActiveEncDictName = function() {
    var rtn = "encoderBtnReleasedData";
    if (this.isButtonPressed()) {
        rtn = "encoderBtnPressedData";
    }
    return rtn;
};
C4Encoder.prototype.getHotStepText = function(isBottomLine) {
    return this.formatLcdDisplaySegmentText(isBottomLine ? "XXooXX" : "XXXXXX");
};
C4Encoder.prototype.pushLcdDisplaySegmentSysexBytes = function(recurIn, isBottomLine, isHotStep) {
    var txt = isBottomLine ? this.getLcdDisplayBottomText() : this.getLcdDisplayTopText();
    txt = isHotStep ? this.getHotStepText(isBottomLine) : txt;
    var rtn = recurIn !== undefined ? recurIn : [];
    if (this.isRowHeader()) {
        rtn = [240, 0, 0, 102, 23];
        var asciiCharCodeOffset = 48;
        rtn.push(asciiCharCodeOffset + this.getLcdRowId());
        var bottomLineOffset = isBottomLine ? LCD_BOTTOM_ROW_OFFSET : 0;
        rtn.push(bottomLineOffset);
        for (var i = 0; i < txt.length; i++) {
            rtn.push(txt.charCodeAt(i))
        }
    } else if (!this.isRowTrailer()) {
        for (i = 0; i < txt.length; i++) {
            rtn.push(txt.charCodeAt(i))
        }
    } else if (this.isRowTrailer()) {
        for (i = 0; i < txt.length; i++) {
            rtn.push(txt.charCodeAt(i))
        }
        if (rtn.length === TOTAL_BYTES_PER_SYSEX_MSG - 1) {
            rtn.push(247);
        } else if (rtn.length === TOTAL_BYTES_PER_SYSEX_MSG) {
            rtn[TOTAL_BYTES_PER_SYSEX_MSG - 1] = 247;
        } else {
            post("pushLcdDisplaySegmentSysexBytes:", this.name, "unexpected sysex length",
                rtn.length, rtn.toString()); post();
        }
    } else {
        post("pushLcdDisplaySegmentSysexBytes:", this.name, "unexpected row location", this.index); post();
    }
    return rtn;
}
C4Encoder.prototype.pushLcdDisplaySegmentTopSysexBytes = function(recurIn, hotStepId) {
    var isBottomLine = false;
    var isHotStep = hotStepId === undefined ? false : this.getPhysicalId() === hotStepId;
    return this.pushLcdDisplaySegmentSysexBytes(recurIn, isBottomLine, isHotStep);
};
C4Encoder.prototype.pushLcdDisplaySegmentBottomSysexBytes = function(recurIn, hotStepId) {
    var isBottomLine = true;
    var isHotStep = hotStepId === undefined ? false : this.getPhysicalId() === hotStepId;
    return this.pushLcdDisplaySegmentSysexBytes(recurIn, isBottomLine, isHotStep);
};
C4Encoder.prototype.formatLcdDisplaySegmentText = function(anyVal) {
    var b = " ";
    var bb = "  ";
    var bbb = "   ";
    var bbbb = "    ";

    var txt = anyVal.toString().trim();
    var del = "|";
    if (txt !== "undefined") {
        switch (txt.length) {
            case 0: txt = bbbb + "*" + b + del; break;    //  4+1+2=7
            case 1: txt = bbbb + txt + b + del; break;
            case 2: txt = bbb + txt + b + del; break;
            case 3: txt = bb + txt + b + del; break;
            case 4: txt = b + txt + b + del; break;
            case 5: txt = txt + b + del; break;
            case 6: txt = txt + del; break;
            default:txt = txt.substring(0, 6) + del;
        }
    }
    if (!(txt.length === 7)) {
        post("formatLcdDisplaySegment: processed display segment is not 7 ascii text-byte values: ");
        post(txt);
        post();
    }
    return txt;
}
C4Encoder.prototype.getLcdRowId = function() {
    var physicalId = this.getPhysicalId();
    var rtn = 0;
    if (physicalId > 0) {
        // 1/8 == 0, 7/8 === 0, 8/8 === 1, 15/8 === 1, 16/8 === 2, 31/8 === 3
        rtn = ~~(physicalId / ENCODERS_PER_LCD_SCREEN);
    }
    if (!(rtn < TOTAL_LCD_SCREENS)) {
        post("C4Encoder.prototype.getLcdRowId: assumption failure", rtn);
        rtn = rtn % TOTAL_LCD_SCREENS;
    }
    return rtn;
};
C4Encoder.prototype.getPhysicalId = function() {
    return this.index % NBR_PHYSICAL_ENCODERS;
};
C4Encoder.prototype.getFeedbackId = function() {
    return this.getPhysicalId() + ENCODER_FEEDBACK_ID_OFFSET;
};
C4Encoder.prototype.lcdRowPosition = function() {
    return this.index % ENCODERS_PER_LCD_SCREEN;// 24%8 === 0, 31%8 === 7,120%8 === 0, 127%8 === 7
};
C4Encoder.prototype.isRowHeader = function() {
    return this.lcdRowPosition() === 0;
};
C4Encoder.prototype.isRowTrailer = function() {
    return this.lcdRowPosition() === 7;
};
C4Encoder.prototype.getLcdDisplayTopText = function() {
    return this.formatLcdDisplaySegmentText(this.name);
};
C4Encoder.prototype.getLcdDisplayBottomText = function() {
    return this.formatLcdDisplaySegmentText(this.getFeedbackValueRaw());
};
C4Encoder.prototype.getFeedbackValueRaw = function() {
    // this method should always be called on "fresh new" objects from the dictionary
    // these local property values grow stale
    var rtn = this.releasedValue;
    if (this.isShiftButtonPressed()) {
        rtn = this.shiftPressedValue;
    } else if (this.isOptionButtonPressed()) {
        rtn = this.optionPressedValue;
    } else if (this.isControlButtonPressed()) {
        rtn = this.controlPressedValue;
    } else if (this.isAltButtonPressed()) {
        rtn = this.altPressedValue;
    } else if (this.isButtonPressed()) {
        rtn = this.pressedValue;
    }
    return rtn;
};
C4Encoder.prototype.getFeedbackValueForRingStyle = function(hotStepId) {
    encLedRingFeedbackStyleDict.name = "ringStyleRef";
    var isHotStep = this.getPhysicalId() === hotStepId;// false for undefined input and non-matching id values
    if (isHotStep) {
        // bang the led ring "FULL ON" (every led in the ring)
        var wrapMax = encLedRingFeedbackStyleDict.get("wrap")[1];
        return wrapMax + ENCODER_RING_BTN_LED_ON_OFFSET;
    } else {
        var sourceRangeMin = BUCKET_EMPTY_VALUE;
        var sourceRangeMax = BUCKET_FULL_VALUE;
        var destRangeRef = encLedRingFeedbackStyleDict.get(this.ringLedFeedbackStyle);
        var destRangeMin = destRangeRef[0];
        var destRangeMax = destRangeRef[1];
        var valueToScale = this.getFeedbackValueRaw();
        var sourceScale = sourceRangeMax - sourceRangeMin;
        var destScale = destRangeMax - destRangeMin;
        var adjustedSourceValue = valueToScale - sourceRangeMin;
        var destScaledValue = destScale / sourceScale * adjustedSourceValue;
        var adjustedDestValue = parseInt(destScaledValue.toString()) + destRangeMin;
        if (this.ringLedFeedbackStyle === "bool") {
            // no smooth scaling, jump from "min" to "max"
            var midway = destScale / 2 + destRangeMin;
            if (adjustedDestValue < midway) {
                adjustedDestValue = destRangeMin;
            } else {
                adjustedDestValue = destRangeMax;
            }
        }
        if (this.isButtonLedON()) {
            return adjustedDestValue + ENCODER_RING_BTN_LED_ON_OFFSET;
        } else {
            return adjustedDestValue;
        }
    }
};
C4Encoder.prototype.setRingFeedbackStyle = function(style) {
    encLedRingFeedbackStyleDict.name = "ringStyleRef";
    if (encLedRingFeedbackStyleDict.contains(style)) {
        // "style" is in the "ring style reference" dict keyset, so use it
        this.ringLedFeedbackStyle = style;
    } else {
        // "style" is NOT in the "ring style reference" dict keyset, so use default style instead
        this.ringLedFeedbackStyle = "single";
        post("c4Encoder.setRingFeedbackStyle: unknown feedback style", style); post();
    }
}

C4Encoder.prototype.bang = function() {
    post("This encoder "); post()
    post(this.toJsonObj()); post();
};
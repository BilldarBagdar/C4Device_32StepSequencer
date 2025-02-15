
//
//
//   ---- C4Button js-object definitions -----
//
//


function C4Button(idx, nm, pressedVal, pressedCnt, rlsdCnt, ledChgCt, ledVal) {

    this.index = idx !== undefined ? idx : THE_BOOK[0];
    this.kname = nm !== undefined ? nm.trim() : "000";// 000 - 127
    this.pressedValue = pressedVal !== undefined ? pressedVal : BUTTON_RELEASED_VALUE;
    this.pressedCount = pressedCnt !== undefined ? pressedCnt : BUTTON_RELEASED_VALUE;
    this.releasedCount = rlsdCnt !== undefined ? rlsdCnt : BUTTON_RELEASED_VALUE;
    this.ledChangeCount = ledChgCt !== undefined ? ledChgCt : BUTTON_RELEASED_VALUE;
    this.ledValue = ledVal !== undefined ? ledVal : BUTTON_LED_OFF_VALUE;
    this.setMyName();

}
C4Button.prototype.setMyName = function() {
    // button names never(?) get displayed on the encoder LCD screens,
    // but they are contracted to a 6 character max length anyway
    if (this.index < 32) {
        switch (this.index) {
            case 0: this.kname = "SPLT13"; break;// FUNCTION buttons
            case 1: this.kname = "SPLT23"; break;
            case 2: this.kname = "SPLT33"; break;
            case 3: this.kname = "LOCK"; break;
            case 4: this.kname = "SPTERA"; break;
            case 5: this.kname = "MARKER"; break;// ASSIGNMENT buttons
            case 6: this.kname = "TRACK"; break;
            case 7: this.kname = "CSTRIP"; break;
            case 8: this.kname = "FUNCTN"; break;
            case 9: this.kname = "BANKL"; break;// PARAMETER buttons
            case 10: this.kname = "BANKR"; break;
            case 11: this.kname = "STEPL"; break;
            case 12: this.kname = "STEPR"; break;
            case 13: this.kname = "SHIFT"; break;// MODIFIER buttons
            case 14: this.kname = "OPTION"; break;
            case 15: this.kname = "CONTRL"; break;
            case 16: this.kname = "ALT"; break;
            case 17: this.kname = "SLOTU"; break;// "Session View" Navigation buttons
            case 18: this.kname = "SLOTD"; break;
            case 19: this.kname = "TRACKL"; break;
            case 20: this.kname = "TRACKR"; break;
            // end of physical C4 buttons
            // begin of logical patch specific buttons
            case 21: // External Transport Status
                // ledValue: ON == Using External Transport, OFF == Using Max Transport
                // pressedValue: Pressed == External RTC Running, Released == External RTC Stopped
                this.kname = "EXTRSP"; break;
            case 22: // External Bypass signal
                // ledValue: ON == Processing events (feedback mode), OFF == Bypassing Event Processing (passthru mode)
                this.kname = "GATEON"; break;
            default:
                // inactive placeholders > 22 && < 32
                this.kname = "SPR" + this.index.toString();
        }
    } else {// encoder buttons
        this.kname = setFormattedName(this.kname, "ENB");
    }
}

var splitFeedbackAddressChangeCount = 0;
var theCurrentSplitButtonLED = new C4Button(0);

// If string content that "is JSON" is "set" as some Dictionary key's value, that value is
// "just a string" to Max in the Dict, so when you "get" that string-value data back,
// it's still a string and JSON.parse() is needed to "objectify" the string content again.
C4Button.prototype.newFromJSONStr = function(s) {
    var btn = JSON.parse(s);
    return new C4Button(btn.index, btn.kname, btn.pressedValue,
        btn.pressedCount, btn.releasedCount, btn.ledChangeCount, btn.ledValue);
};
// But, if string content that "is JSON" is "setparse" as some Dictionary key's value, that value is
// "another nested Dict" to Max in the Dict, so when you "get" that Dict-value data back,
// it's not a string, it's a js-Dict object, each key-value pair can already be queried directly.
C4Button.prototype.newFromDict = function(d) {
    if (d !== undefined && d !== null) {
        return new C4Button(d.get("index"), d.get("kname"), d.get("pressedValue"),
            d.get("pressedCount"), d.get("releasedCount"), d.get("ledChangeCount"), d.get("ledValue"));
    } else {
        post("C4Button.newFromDict: function called for undefined input Dict"); post();
        return d;
    }
};
C4Button.prototype.toJsonStr = function() {
    return JSON.stringify(this);
};

C4Button.prototype.copyDataFrom = function(other) {
    this.pressedValue = other.pressedValue;
    this.pressedCount = other.pressedCount;
    this.releasedCount = other.releasedCount;
    this.ledChangeCount = other.ledChangeCount;
    this.ledValue = other.ledValue;
};
C4Button.prototype.updateActiveDicts = function() {
    btnStateDict.name = "buttonStateChangeCount";
    btnStateDict.replace(this.index, this.pressedCount + this.releasedCount);
    ledStateDict.name = "ledStateChangeCount";
    ledStateDict.replace(this.index, this.ledChangeCount);
    this.updateNamedDict("c4Buttons");
};
C4Button.prototype.updateNamedDict = function(dictName, keyPrefix) {
    var temp = new Dict();
    temp.name = dictName;
    if (keyPrefix !== undefined && keyPrefix.length < 20) {
        // "trackDeck::trckButtons" is shortest expected "defined" prefix length at 22 including ::
        post("C4Button.updateNamedDict: unexpected keyPrefix", dictName, keyPrefix);post();
    }
    var meKey = keyPrefix !== undefined ? keyPrefix + "::" + this.index : this.index;
    var replaceKey = meKey + "::pressedValue";
    temp.replace(replaceKey, this.pressedValue);
    replaceKey = meKey + "::pressedCount";
    temp.replace(replaceKey, this.pressedCount);
    replaceKey = meKey + "::releasedCount";
    temp.replace(replaceKey, this.releasedCount);
    replaceKey = meKey + "::ledChangeCount";
    temp.replace(replaceKey, this.ledChangeCount);
    replaceKey = meKey + "::ledValue";
    temp.replace(replaceKey, this.ledValue);
};

C4Button.prototype.isEncoderButton = function() {
    return !(this.index < ENCODER_BTN_OFFSET);
};
C4Button.prototype.isAssignmentButton = function() {
    return this.index >= 5 && this.index <= 8;
};
C4Button.prototype.isVirtualButton = function() {
    return this.index > 20 && this.index < ENCODER_BTN_OFFSET;
};
C4Button.prototype.isBypassed = function() {
    buttonsDict.name = "c4Buttons";
    var signalKey = PROCESSING_BYPASS_SIGNAL_ID + "::ledValue";
    var signalValue = buttonsDict.get(signalKey);
    // ledValue: ON == Processing events (feedback mode), OFF == Bypassing Event Processing (passthru mode)
    return signalValue === 0;
};
C4Button.prototype.isPressed = function() {
    btnStateDict.name = "buttonStateChangeCount";
    return btnStateDict.get(this.index) % 2;
};
C4Button.prototype.isLedON = function() {
    ledStateDict.name = "ledStateChangeCount";
    return ledStateDict.get(this.index) % 2;
};
C4Button.prototype.isLockButtonLedON = function() {
    ledStateDict.name = "ledStateChangeCount";
    return ledStateDict.get(3) % 2;
};
C4Button.prototype.isReverseSplitLedCycle = function() {
    return this.isLockButtonLedON();
};
//returns (0 - 31) values for BOTH regular buttons and all (128) encoder buttons
C4Button.prototype.getPhysicalEncoderId = function() {
    var rtn = this.index;
    // pass through normal button indexes below 32
    if (this.isEncoderButton()) {
        rtn = this.index % NBR_PHYSICAL_ENCODERS;// 159 % 32 === 31
    }
    return rtn;
};
// only returns (0 - 31) values for regular buttons
//      returns (32 - 63) for all (128) encoder buttons
C4Button.prototype.getEncoderFeedbackId = function() {
    var rtn = this.index;
    // pass through normal button indexes below 32
    if (this.isEncoderButton()) {
        // encoder button
        rtn = this.getPhysicalEncoderId() + ENCODER_FEEDBACK_ID_OFFSET;// 31 + 32 = 63
    }
    return rtn;
};

C4Button.prototype.processEvent = function (v) {
    buttonsDict.name = "c4Buttons";
    encodersDict.name = "c4Encoders";
    btnStateDict.name = "buttonStateChangeCount";
    ledStateDict.name = "ledStateChangeCount";
    var k = this.index;
    var offset = 0;
    var resetK = false;
    var buttonJson = this.toJsonStr();
    var encoderJson = " ";
    if (this.isVirtualButton()) {
        if (this.kname === "GATEON")  {
            post("C4Button.processEvent: bypass processing toggle received from C4 remote script");post();
        }
    }
    else if (this.isEncoderButton()) {// fetch encoder references
        offset = reqModule.getPageOffset();
        k = k + offset;
        buttonJson = buttonsDict.get(k);
        // button 32 is encoder 0 (feedback address is 32 for both)
        encoderJson = encodersDict.get(k - ENCODER_BTN_OFFSET);
        resetK = true;
    }

    var rtn2 = [this.index, this.ledValue, this.pressedValue];
    if (k === 0) {
        rtn2 = this.processSplitEvent(v);
    } else {

        var eventSource = this;// a "non-encoder button" but not Split
        var encoderRef = new C4Encoder();
        var storedActiveDeckName = reqModule.getActiveControllerDeckName();// deck before any updates
        if (resetK) {
            eventSource = this.newFromDict(buttonJson);// a "virtual encoder" button
            encoderRef = encoderRef.newFromDict(encoderJson);
        }
        var oldBtnStateChangeCount = btnStateDict.get(eventSource.index)
        if (v === BUTTON_PRESSED_VALUE) {
            eventSource.pressedCount += 1;
            var replaceKey = eventSource.index + "::pressedCount";
            buttonsDict.replace(replaceKey, eventSource.pressedCount);
        } else {// v == 0 button released
            eventSource.releasedCount += 1;
            replaceKey = eventSource.index + "::releasedCount";
            buttonsDict.replace(replaceKey, eventSource.releasedCount);
        }
        eventSource.pressedValue = v;
        replaceKey = eventSource.index + "::pressedValue";
        buttonsDict.replace(replaceKey, eventSource.pressedValue);
        //increment the "state change count" every time the button's "pressedValue" toggles
        var newCount = oldBtnStateChangeCount + 1;
        var eventCount = eventSource.pressedCount + eventSource.releasedCount;
        if (newCount !== eventCount) {
            post("C4Button.processEvent: button press count mismatch", newCount, eventCount);post();
        } else {
            btnStateDict.set(eventSource.index, newCount);
        }

        if (eventSource.pressedCount === eventSource.releasedCount) {
            // one press+release cycle has completed
            // only increment the LED change count after complete press+release cycles
            var oldLedStateChangeCount = ledStateDict.get(eventSource.index);
            if (oldLedStateChangeCount !== eventSource.ledChangeCount) {
                post("C4Button.processEvent: button LED change count mismatch",
                    oldLedStateChangeCount, eventSource.ledChangeCount);post();
            } else {
                eventSource.ledChangeCount += 1;
                replaceKey = eventSource.index + "::ledChangeCount";
                buttonsDict.replace(replaceKey, eventSource.ledChangeCount);
                ledStateDict.set(eventSource.index, eventSource.ledChangeCount);
                if (eventSource.ledChangeCount % 2 !== eventSource.isLedON()) {
                    post("C4Button.processEvent: button LED change count mismatch, Dict update issue?");post();
                }
                eventSource.ledValue = eventSource.isLedON() * BUTTON_LED_ON_VALUE;
                replaceKey = eventSource.index + "::ledValue";
                buttonsDict.replace(replaceKey, eventSource.ledValue);
                if (resetK) {
                    // this is an encoder button led change, also update the associated encoder property
                    encoderRef.buttonLedValue = eventSource.ledValue;
                    replaceKey = encoderRef.index + "::buttonLedValue";
                    encodersDict.replace(replaceKey, encoderRef.buttonLedValue);
                }
            }
        }
        if (resetK) {

            k = k - offset;// without the page-offset, k holds the sending encoder button number again
            eventSource.index = k;// eventSource is never an alias for "this" here (never a "Note feedback" button)
        }
        rtn2 = [eventSource.index, eventSource.ledValue, eventSource.pressedValue];
    }
    if (k > 0 && eventSource.isAssignmentButton() && (eventSource.pressedCount === eventSource.releasedCount)) {
        // "eventSource" above was an alias for "this" (an Assignment button)
        // reassigning the rtn2 value here is currently redundant
        if (!(eventSource.ledValue === this.ledValue && eventSource.pressedValue === this.pressedValue)) {
            post("C4Button.processEvent: object reference assumption issue");post();
        }
        rtn2 = eventSource.propagateOnDutyAssignmentChange(storedActiveDeckName);
    }
    return rtn2;
};

C4Button.prototype.processSplitEvent = function (v) {
    buttonsDict.name = "c4Buttons";
    btnStateDict.name = "buttonStateChangeCount";
    ledStateDict.name = "ledStateChangeCount";
    theCurrentSplitButtonLED.index =
        SPLIT_FEEDBACK_IDS[splitFeedbackAddressChangeCount % SPLIT_FEEDBACK_IDS.length];
    var k = theCurrentSplitButtonLED.index;// k value is now one of the Split LED values [0, 1, 2]
    if (k !== this.index) {
        var splitLedJSON = buttonsDict.get(k);
        var c4SplitLed = this.newFromDict(splitLedJSON);
    } else {
        c4SplitLed = this;
    }
    // c4SplitLed.index value should now === one of the Split LED address values [0, 1, 2],
    // should now reference the "current" Split Button LED (which might change)

    var pressedOrReleased = "PRESSED";
    var oldBtnStateChangeCount = btnStateDict.get(c4SplitLed.index);
    if (v === BUTTON_PRESSED_VALUE) {
        c4SplitLed.pressedCount += 1;
        var replaceKey = c4SplitLed.index + "::pressedCount";
        buttonsDict.replace(replaceKey, c4SplitLed.pressedCount);
    } else {
        pressedOrReleased = "RELEASED";
        c4SplitLed.releasedCount += 1;
        replaceKey = c4SplitLed.index + "::releasedCount";
        buttonsDict.replace(replaceKey, c4SplitLed.releasedCount);
    }
    c4SplitLed.pressedValue = v;
    replaceKey = c4SplitLed.index + "::pressedValue";
    buttonsDict.replace(replaceKey, c4SplitLed.pressedValue);
    //increment the "state change count" every time the button's "pressedValue" toggles
    var newCount = oldBtnStateChangeCount + 1;
    var eventCount = c4SplitLed.pressedCount + c4SplitLed.releasedCount;
    if (newCount !== eventCount) {
        post("C4Button.processSplitEvent: button press count mismatch", newCount, eventCount);post();
    } else {
        btnStateDict.set(c4SplitLed.index, newCount);
    }

    if (c4SplitLed.pressedCount === c4SplitLed.releasedCount || pressedOrReleased === "RELEASED") {
        // one press+release cycle has completed
        // only increment the LED change count after complete press+release cycles
        var oldLedStateChangeCount = ledStateDict.get(c4SplitLed.index);
        if (oldLedStateChangeCount !== c4SplitLed.ledChangeCount) {
            post("C4Button.processSplitEvent: button LED change count mismatch",
                oldLedStateChangeCount, c4SplitLed.ledChangeCount);
            post();
        } else {
            c4SplitLed.ledChangeCount += 1;
            ledStateDict.set(c4SplitLed.index, c4SplitLed.ledChangeCount);
            replaceKey = c4SplitLed.index + "::ledChangeCount";
            buttonsDict.replace(replaceKey, c4SplitLed.ledChangeCount);

            var newLedStateChangeCount = ledStateDict.get(c4SplitLed.index);
            var changeToON = (newLedStateChangeCount % 2) * BUTTON_PRESSED_VALUE;
            c4SplitLed.ledValue = changeToON;
            replaceKey = c4SplitLed.index + "::ledValue";
            buttonsDict.replace(replaceKey, c4SplitLed.ledValue);
            if (!changeToON) {
                // incrementing the splitFeedbackAddressChangeCount only when the Split LED changes to OFF here,
                // means (feedback from) this current release event can turn off the current Split LED, and THEN
                // the next Split button press should still feedback to the next Split LED address [0, 1, 2]
                if (this.isReverseSplitLedCycle()) {
                    var mod3minusOne = SPLIT_FEEDBACK_IDS.length - 1;
                    splitFeedbackAddressChangeCount += mod3minusOne;
                } else {
                    splitFeedbackAddressChangeCount += 1;
                }
            }
        }
    } // else after (possibly during held) press event, before release event

    // post("updated buttons Dict JSON after Split event processing", c4SplitLed.toJsonStr());
    // post();post("----- -----", pressedOrReleased, "event processing complete ----- -----");post();
    return [c4SplitLed.index, c4SplitLed.ledValue, c4SplitLed.pressedValue];// [k, l, v]
};

C4Button.prototype.propagateOnDutyAssignmentChange = function(previouslyActiveDeckName) {
    // "this" is always a js-object from the "on duty" deck (the "c4Buttons" Dict) that has already been processed
    // normally after release, but "Assignment" data is common to all decks, so propagate "this" feedback to all decks
    var allDecks = reqModule.getAllControllerDeckNames();
    var oneDeckCrew = "error";
    c4DeviceControllerDict.name = "C4DeviceExecutiveController";

    for (var i = 0; i < allDecks.length; i++) {
        var deckName = allDecks[i];
        var crewName = "Buttons";
        // Not using C4DeviceController.getCrewReplaceKeyForDeck() functionality here
        // because (so far) C4Button js-objects only couple with the underlying Max js-Dict-objects
        // and their crew-mate "Encoder" js-objects on the same deck (when their deck is "on duty").
        // Not using C4DeviceController.getCrewNameForDeck() either (for the same reason).
        // An instance of C4DeviceController "contains" every button and encoder stored by the controller,
        // don't want to reserve all that "memory" for a util-object here just to call string-cat functions 5 times
        // every time this method is called.
        var startsWith = deckName.charAt(0);
        var bridgeConnector = "::brdg";
        var chanStConnector = "::chst";
        var functnConnector = "::fnct";
        var markerConnector = "::mrkr";
        var trackConnector = "::trck"
        switch(startsWith) {
            case "b": oneDeckCrew = deckName + bridgeConnector + crewName; break;
            case "c": oneDeckCrew = deckName + chanStConnector + crewName; break;
            case "f": oneDeckCrew = deckName + functnConnector + crewName; break;
            case "m": oneDeckCrew = deckName + markerConnector + crewName; break;
            case "t": oneDeckCrew = deckName + trackConnector + crewName; break;
            default: post("propagateOnDutyAssignmentChange: unexpected start of deck key-name", deckName); post();
        }
        var meKey = "::" + this.index;
        var cmdKeyPrefix = oneDeckCrew + meKey;
        if (cmdKeyPrefix.charAt(0) === "e") {
            post("propagateOnDutyAssignmentChange: unexpected errorKey", deckName, cmdKeyPrefix); post();
        }

        var cmdBtnDict = c4DeviceControllerDict.get(cmdKeyPrefix);
        var c4Btn = this.newFromDict(cmdBtnDict);
        c4Btn.copyDataFrom(this);
        cmdKeyPrefix = oneDeckCrew;
        // post("propagateOnDutyAssignmentChange: propagating this data to", cmdKeyPrefix); post();
        // post(this.toJsonStr()); post();
        c4Btn.updateNamedDict("C4DeviceExecutiveController", cmdKeyPrefix);
    }

    var currentDeckName = reqModule.getActiveControllerDeckName();
    if (currentDeckName !== previouslyActiveDeckName) {

        startsWith = previouslyActiveDeckName.charAt(0);
        oneDeckCrew = "error";
        crewName = "Split";
        switch(startsWith) {
            case "b": oneDeckCrew = previouslyActiveDeckName + bridgeConnector + crewName; break;
            case "c": oneDeckCrew = previouslyActiveDeckName + chanStConnector + crewName; break;
            case "f": oneDeckCrew = previouslyActiveDeckName + functnConnector + crewName; break;
            case "m": oneDeckCrew = previouslyActiveDeckName + markerConnector + crewName; break;
            case "t": oneDeckCrew = previouslyActiveDeckName + trackConnector + crewName; break;
            default: post("propagateOnDutyAssignmentChange: unexpected start of previously active deck key-name",
                previouslyActiveDeckName); post();
        }
        cmdKeyPrefix = oneDeckCrew;
        //post("C4Button.propagateOnDutyAssignmentChange: getting Split button officer of deck from Dict with key"); post();
        var deckSplitDict = c4DeviceControllerDict.get(cmdKeyPrefix);
        var deckSplitBtn = this.newFromDict(deckSplitDict);
        theCurrentSplitButtonLED.ledChangeCount = splitFeedbackAddressChangeCount;
        deckSplitBtn.copyDataFrom(theCurrentSplitButtonLED);
        //post(cmdKeyPrefix, "and storing Active Split data to officer Split button for later"); post();
        deckSplitBtn.updateNamedDict("C4DeviceExecutiveController", cmdKeyPrefix);
    } else {
        // sometimes "Assignment button" LEDs change state but don't trigger a deck change
        // because another "Assignment button" LED with a higher precedence is already "on duty"
        // although it probably wouldn't hurt(?) to "copy-and-store data from" the "previously active"
        // (and still active) deck even in this "not changing yet" case. (would get overwritten again when
        // "previously active" really does differ)
        // post("propagateOnDutyAssignmentChange: no current_split_button_led data propagated because");
        // post(currentDeckName, "===", previouslyActiveDeckName, "correct?"); post();
    }

    return [this.index, this.ledValue, this.pressedValue];
}

C4Button.prototype.bang = function() {
    post("This button "); post();
    post(this.toJsonStr()); post();
};
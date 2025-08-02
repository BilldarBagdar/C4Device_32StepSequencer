
//
//
//   ---- C4DeviceController js-object definitions -----
//
//

// each "deck" consists of one "officer" and 288 "crew"; 160 buttons, and 128 encoders.
// for all 5 "decks": 1445 total crew and officers; 805 total buttons, 640 total encoders
// The deck crew, the buttons and encoders on each deck, are independent of every other deck crew
// EXCEPT - The state of the "Assignment Group" Buttons (Marker, Track, Chan Strip, Function, and "all group off")
// is common to all decks. The decks are hierarchically selected. (Precedence: Marker, Track, ChanStrip, Function,
// and "all off"). "Marker" always wins when LED is ON, and "ChanStrip" loses to both "Marker" and "Track" but
// wins over "Function".  "Function" LED ON only wins over "all (Assignment group) LEDs OFF".
//  (Similar to how the Split button LED On states are (1/3, 2/2, 3/1, and "all off"), except the "Assignment LEDs"
//  operate independently of the "deck hierarchy".  "Marker" wins when ON, but when "Marker" turns OFF, the next winner
//  could be any other ON "Assignment LED", "all (group) OFF" comes in last every time.) see commonRequire.js
function C4DeviceController(feedbackStyle) {
    this.name = "C4DeviceExecutiveController";
    this.bridgeDeck = {};
    this.bridgeDeck.brdgButtons = {};
    this.bridgeDeck.brdgEncoders = {};
    this.bridgeDeck.brdgSplit = {};// officer-of-the-deck
    this.bridgeDeck.brdgSplit = new C4Button(256, "SPLCNT", BUTTON_RELEASED_VALUE, 0, 0,0, BUTTON_LED_OFF_VALUE);

    this.markerDeck = {};
    this.markerDeck.mrkrButtons = {};
    this.markerDeck.mrkrEncoders = {};
    this.markerDeck.mrkrSplit = {};
    this.markerDeck.mrkrSplit = new C4Button(257, "SPLCNT", BUTTON_RELEASED_VALUE, 0, 0,0, BUTTON_LED_OFF_VALUE);

    this.trackDeck = {};
    this.trackDeck.trckButtons = {};
    this.trackDeck.trckEncoders = {};
    this.trackDeck.trckSplit = {};
    this.trackDeck.trckSplit = new C4Button(258, "SPLCNT", BUTTON_RELEASED_VALUE, 0, 0,0, BUTTON_LED_OFF_VALUE);

    this.chanStDeck = {};
    this.chanStDeck.chstButtons = {};
    this.chanStDeck.chstEncoders = {};
    this.chanStDeck.chstSplit = {};
    this.chanStDeck.chstSplit = new C4Button(259, "SPLCNT", BUTTON_RELEASED_VALUE,0, 0,0, BUTTON_LED_OFF_VALUE);

    this.functnDeck = {};
    this.functnDeck.fnctButtons = {};
    this.functnDeck.fnctEncoders = {};
    this.functnDeck.fnctSplit = {};
    this.functnDeck.fnctSplit = new C4Button(260, "SPLCNT", BUTTON_RELEASED_VALUE,0, 0,0, BUTTON_LED_OFF_VALUE);

    for (var i = 0; i < TOTAL_BUTTONS; i++) {
        this.bridgeDeck["brdgButtons"][i] =
            new C4Button(i, i.toString(), BUTTON_RELEASED_VALUE,0, 0,0, BUTTON_LED_OFF_VALUE);
        this.markerDeck["mrkrButtons"][i] =
            new C4Button(i, i.toString(), BUTTON_RELEASED_VALUE,0, 0,0, BUTTON_LED_OFF_VALUE);
        this.trackDeck["trckButtons"][i] =
            new C4Button(i, i.toString(), BUTTON_RELEASED_VALUE,0, 0,0, BUTTON_LED_OFF_VALUE);
        this.chanStDeck["chstButtons"][i] =
            new C4Button(i, i.toString(), BUTTON_RELEASED_VALUE,0, 0,0, BUTTON_LED_OFF_VALUE);
        this.functnDeck["fnctButtons"][i] =
            new C4Button(i, i.toString(), BUTTON_RELEASED_VALUE,0, 0,0, BUTTON_LED_OFF_VALUE);
        if (i < TOTAL_ENCODERS) {
            this.bridgeDeck["brdgEncoders"][i] =
                new C4Encoder(i, i.toString(), 0, 0, feedbackStyle, BUTTON_LED_OFF_VALUE,0, 0, 0, 0, 0);
            this.markerDeck["mrkrEncoders"][i] =
                new C4Encoder(i, i.toString(), 0, 0, feedbackStyle, BUTTON_LED_OFF_VALUE,0, 0, 0, 0, 0);
            this.trackDeck["trckEncoders"][i] =
                new C4Encoder(i, i.toString(), 0, 0, feedbackStyle, BUTTON_LED_OFF_VALUE,0, 0, 0, 0, 0);
            this.chanStDeck["chstEncoders"][i] =
                new C4Encoder(i, i.toString(), 0, 0, feedbackStyle, BUTTON_LED_OFF_VALUE,0, 0, 0, 0, 0);
            this.functnDeck["fnctEncoders"][i] =
                new C4Encoder(i, i.toString(), 0, 0, feedbackStyle, BUTTON_LED_OFF_VALUE,0, 0, 0, 0, 0);
        }
    }
}

C4DeviceController.prototype.newFromDict = function(d) {
    
    if (d !== undefined && d !== null) {
        var rtn = new C4DeviceController("single");
        var utilBtn = new C4Button(0);
        var utilEnc = new C4Encoder(0);
        rtn.bridgeDeck.brdgSplit.copyDataFrom(utilBtn.newFromDict(d.get("bridgeDeck::brdgSplit")));
        rtn.markerDeck.mrkrSplit.copyDataFrom(utilBtn.newFromDict(d.get("markerDeck::mrkrSplit")));
        rtn.trackDeck.trckSplit.copyDataFrom(utilBtn.newFromDict(d.get("trackDeck::trckSplit")));
        rtn.chanStDeck.chstSplit.copyDataFrom(utilBtn.newFromDict(d.get("chanStDeck::chstSplit")));
        rtn.functnDeck.fnctSplit .copyDataFrom(utilBtn.newFromDict(d.get("functnDeck::fnctSplit")));

        for (var i = 0; i < TOTAL_BUTTONS; i++) {
            var path = "bridgeDeck::brdgButtons::" + i.toString();
            rtn.bridgeDeck["brdgButtons"][i] = utilBtn.newFromDict(d.get(path));
            path = "markerDeck::mrkrButtons::" + i.toString();
            rtn.markerDeck["mrkrButtons"][i] = utilBtn.newFromDict(d.get(path));
            path = "trackDeck::trckButtons::" + i.toString();
            rtn.trackDeck["trckButtons"][i] = utilBtn.newFromDict(d.get(path));
            path = "chanStDeck::chstButtons::" + i.toString();
            rtn.chanStDeck["chstButtons"][i] = utilBtn.newFromDict(d.get(path));
            path = "functnDeck::fnctButtons::" + i.toString();
            rtn.functnDeck["fnctButtons"][i] = utilBtn.newFromDict(d.get(path));
            if (i < TOTAL_ENCODERS) {
                path = "bridgeDeck::brdgEncoders::" + i.toString();
                rtn.bridgeDeck["brdgEncoders"][i] = utilEnc.newFromDict(d.get(path));
                path = "markerDeck::mrkrEncoders::" + i.toString();
                rtn.markerDeck["mrkrEncoders"][i] = utilEnc.newFromDict(d.get(path));
                path = "trackDeck::trckEncoders::" + i.toString();
                rtn.trackDeck["trckEncoders"][i] = utilEnc.newFromDict(d.get(path));
                path = "chanStDeck::chstEncoders::" + i.toString();
                rtn.chanStDeck["chstEncoders"][i] = utilEnc.newFromDict(d.get(path));
                path = "functnDeck::fnctEncoders::" + i.toString();
                rtn.functnDeck["fnctEncoders"][i] = utilEnc.newFromDict(d.get(path));
            }
        }
        
        return rtn;
    } else {
        post("C4DeviceController.newFromDict: function called for undefined input Dict"); post();
        return d;
    }
};

C4DeviceController.prototype.newCopy= function() {

    var rtn = new C4DeviceController("single");
    var utilBtn = new C4Button(0);
    var utilEnc = new C4Encoder(0);
    rtn.bridgeDeck.brdgSplit.copyDataFrom(this.bridgeDeck.brdgSplit);
    rtn.markerDeck.mrkrSplit.copyDataFrom(this.markerDeck.mrkrSplit);
    rtn.trackDeck.trckSplit.copyDataFrom(this.trackDeck.trckSplit);
    rtn.chanStDeck.chstSplit.copyDataFrom(this.chanStDeck.chstSplit);
    rtn.functnDeck.fnctSplit .copyDataFrom(this.functnDeck.fnctSplit);

    for (var i = 0; i < TOTAL_BUTTONS; i++) {// 160 logical buttons
        rtn.bridgeDeck.brdgButtons[i].copyDataFrom(this.bridgeDeck.brdgButtons[i]);
        rtn.markerDeck.mrkrButtons[i].copyDataFrom(this.markerDeck.mrkrButtons[i]);
        rtn.trackDeck.trckButtons[i].copyDataFrom(this.trackDeck.trckButtons[i]);
        rtn.chanStDeck.chstButtons[i].copyDataFrom(this.chanStDeck.chstButtons[i]);
        rtn.functnDeck.fnctButtons[i].copyDataFrom(this.functnDeck.fnctButtons[i]);
        if (i < TOTAL_ENCODERS) {// 128 logical encoders
            rtn.bridgeDeck.brdgEncoders[i].copyDataFrom(this.bridgeDeck.brdgEncoders[i]);
            rtn.markerDeck.mrkrEncoders[i].copyDataFrom(this.markerDeck.mrkrEncoders[i]);
            rtn.trackDeck.trckEncoders[i].copyDataFrom(this.trackDeck.trckEncoders[i]);
            rtn.chanStDeck.chstEncoders[i].copyDataFrom(this.chanStDeck.chstEncoders[i]);
            rtn.functnDeck.fnctEncoders[i].copyDataFrom(this.functnDeck.fnctEncoders[i]);
        }
    }
    return rtn;
};

C4DeviceController.prototype.copyDataFrom= function(fileController) {

    this.bridgeDeck.brdgSplit.copyDataFrom(fileController.bridgeDeck.brdgSplit);
    this.markerDeck.mrkrSplit.copyDataFrom(fileController.markerDeck.mrkrSplit);
    this.trackDeck.trckSplit.copyDataFrom(fileController.trackDeck.trckSplit);
    this.chanStDeck.chstSplit.copyDataFrom(fileController.chanStDeck.chstSplit);
    this.functnDeck.fnctSplit .copyDataFrom(fileController.functnDeck.fnctSplit);

    for (var i = 0; i < TOTAL_BUTTONS; i++) {// 160 logical buttons
        this.bridgeDeck.brdgButtons[i].copyDataFrom(fileController.bridgeDeck.brdgButtons[i]);
        this.markerDeck.mrkrButtons[i].copyDataFrom(fileController.markerDeck.mrkrButtons[i]);
        this.trackDeck.trckButtons[i].copyDataFrom(fileController.trackDeck.trckButtons[i]);
        this.chanStDeck.chstButtons[i].copyDataFrom(fileController.chanStDeck.chstButtons[i]);
        this.functnDeck.fnctButtons[i].copyDataFrom(fileController.functnDeck.fnctButtons[i]);
        if (i < TOTAL_ENCODERS) {// 128 logical encoders
            this.bridgeDeck.brdgEncoders[i].copyDataFrom(fileController.bridgeDeck.brdgEncoders[i]);
            this.markerDeck.mrkrEncoders[i].copyDataFrom(fileController.markerDeck.mrkrEncoders[i]);
            this.trackDeck.trckEncoders[i].copyDataFrom(fileController.trackDeck.trckEncoders[i]);
            this.chanStDeck.chstEncoders[i].copyDataFrom(fileController.chanStDeck.chstEncoders[i]);
            this.functnDeck.fnctEncoders[i].copyDataFrom(fileController.functnDeck.fnctEncoders[i]);
        }
    }
};

C4DeviceController.prototype.newRandomizedData = function() {

    var rtn = this.newCopy();

    for (var i = 0; i < TOTAL_BUTTONS; i++) {// 160

        if (i < NBR_PHYSICAL_ENCODERS) {
            // don't randomize "control" button values, need to keep "ongoing control" data
        } else { // if (i >= NBR_PHYSICAL_ENCODERS) {// 32
            //  Encoder 00 is associated with Button 32
            var ledBefore = rtn.bridgeDeck.brdgButtons[i].ledValue;
            var buttonLedValue = rtn.bridgeDeck.brdgButtons[i].randomizeData();
            rtn.bridgeDeck.brdgEncoders[i - NBR_PHYSICAL_ENCODERS].randomizeData(buttonLedValue);

            buttonLedValue = rtn.markerDeck.mrkrButtons[i].randomizeData();
            rtn.markerDeck.mrkrEncoders[i - NBR_PHYSICAL_ENCODERS].randomizeData(buttonLedValue);

            buttonLedValue = rtn.trackDeck.trckButtons[i].randomizeData();
            rtn.trackDeck.trckEncoders[i - NBR_PHYSICAL_ENCODERS].randomizeData(buttonLedValue);

            buttonLedValue = rtn.chanStDeck.chstButtons[i].randomizeData();
            rtn.chanStDeck.chstEncoders[i - NBR_PHYSICAL_ENCODERS].randomizeData(buttonLedValue);

            buttonLedValue = rtn.functnDeck.fnctButtons[i].randomizeData();
            rtn.functnDeck.fnctEncoders[i - NBR_PHYSICAL_ENCODERS].randomizeData(buttonLedValue);
        }
        if (i - NBR_PHYSICAL_ENCODERS >= TOTAL_ENCODERS) {
            post("C4DeviceController.newRandomizedData: assumption issue, iterating OOB?", i); post();
        }
    }

    // already copied above, should be redundant
    rtn.propagateActiveAssignmentsAcrossDecks();
    rtn.propagateActiveSpareSignalsAcrossDecks();

    return rtn;
};

C4DeviceController.prototype.reconcileActiveModifiers = function(activeDeckName) {

}

C4DeviceController.prototype.toJsonStr = function() {
    return JSON.stringify(this);
};
C4DeviceController.prototype.getDeckForCrewNamePrefix = function(crewPfx) {
    crewPfx = crewPfx !== undefined ? crewPfx : "brdg";
    var startsWith = crewPfx.charAt(0);
    var deck = "bridgeDeck";
    switch(startsWith) {
        case "b": deck = "bridgeDeck"; break;
        case "c": deck = "chanStDeck"; break;
        case "f": deck = "functnDeck"; break;
        case "m": deck = "markerDeck"; break;
        case "t": deck = "trackDeck"; break;
        default: post("C4DeviceController.getDeckForCrewNamePrefix: unexpected start of crew key-name", crew); post();
    }
    return deck;
};
C4DeviceController.prototype.getCrewNamePrefixForDeck = function(deckName) {
    deckName = deckName !== undefined ? deckName : "bridgeDeck";
    var startsWith = deckName.charAt(0);
    var rtn = "brdg";
    switch(startsWith) {
        case "c": rtn = "chst"; break;
        case "f": rtn = "fnct"; break;
        case "m": rtn = "mrkr"; break;
        case "t": rtn = "trck"; break;
        case "b": break;
        default: post("C4DeviceController.getCrewNamePrefixForDeck: unexpected start of deck key-name", deckName); post();
    }
    return rtn;
};
C4DeviceController.prototype.getCrewNameForDeck = function(deckName, crewName) {
    deckName = deckName !== undefined ? deckName : "bridgeDeck";
    crewName = crewName !== undefined ? crewName : "Buttons";
    return this.getCrewNamePrefixForDeck(deckName) + crewName;
};
C4DeviceController.prototype.getCrewReplaceKeyForDeck = function(deckName, crewName) {
    deckName = deckName !== undefined ? deckName : "bridgeDeck";
    crewName = crewName !== undefined ? crewName : "Buttons";
    return deckName + "::" + this.getCrewNameForDeck(deckName, crewName);
};
C4DeviceController.prototype.refreshDeckForDutySwap = function(deckName) {

    this.propagateActiveAssignmentsAcrossDecks();// copies the current "active" assignment data to all decks of "this"
    this.refreshDeckForFileLoad(deckName);
};

// When loading from file, the "Active Assignments" data needs to be replaced with saved assignment data.
// But the "Spare Signals" data needs to be respected
// (For example, don't change current verbose status because loading data from file)
C4DeviceController.prototype.refreshDeckForFileLoad = function(deckName) {

    c4DeviceControllerDict.name = "C4DeviceExecutiveController";
    if (deckName === undefined) {
        post("C4DeviceController.refreshDeckForFileLoad: undefined deckName"); post();
    }

    this.propagateActiveSpareSignalsAcrossDecks();// copies the current "active" spare signals data to all decks of "this"

    deckName = deckName !== undefined ? deckName : "bridgeDeck";
    var crewName = this.getCrewNameForDeck(deckName, "Split");
    var curDeckSplit = this[deckName][crewName];
    var splitRefreshKey = this.getCrewReplaceKeyForDeck(deckName, "Split");
    var backingSplitDict = c4DeviceControllerDict.get(splitRefreshKey)
    var backingSplitBtn = curDeckSplit.newFromDict(backingSplitDict);
    if (!reqModule.compareSaveData(curDeckSplit, backingSplitBtn)) {
        // this update is needed every time a deck changes (for example) after the split button (the squad on that deck) has been pressed+released any number of times
        //post("C4DeviceController.refreshDeckForFileLoad: the two controllers don't agree updating", curDeckSplit.toJsonStr(), "to", backingSplitBtn.toJsonStr()); post();
        curDeckSplit.copyDataFrom(backingSplitBtn);
    }
}

C4DeviceController.prototype.updateActiveDeckSplit = function(activeDeckName, activeSplitButton) {
    // The C4Button objects don't know about this controller except when the "active" Deck changes
    // the "active" Split Button (global var) data normally only gets saved to the backing dict when the "active" Deck changes
    // For saving the sequencer to disk, this controller needs to match the backing dict, so it needs to be updated before that match test
    var crewName = this.getCrewNameForDeck(activeDeckName, "Split");
    var curDeckSplit = this[activeDeckName][crewName];
    curDeckSplit.copyDataFrom(activeSplitButton);
    curDeckSplit.updateNamedDict("C4DeviceExecutiveController", this.getCrewReplaceKeyForDeck(activeDeckName, "Split"));
}

// When loading a saved sequencer dataset from file, don't also load the saved "spare signal button" data
// Keep the currently active signals configuration (selected by the current user)
// overwrite "this" controller object's signals data from the active buttons Dict
// see: propagateActiveSpareSignalsAcrossDecks() below
C4DeviceController.prototype.copyActiveSignals = function() {
    this.propagateActiveSpareSignalsAcrossDecks();
};

C4DeviceController.prototype.copyAssignmentsToActiveButtons = function() {
    buttonsDict.name = "c4Buttons";
    var utilBtn = new C4Button(0);
    for(var i = 5; i < 9; i++) {
        var btnDict = buttonsDict.get(i);
        var c4ActiveBtn = utilBtn.newFromDict(btnDict);

        c4ActiveBtn.copyDataFrom(this.bridgeDeck["brdgButtons"][i]);
        c4ActiveBtn.copyDataFrom(this.markerDeck["mrkrButtons"][i]);
        c4ActiveBtn.copyDataFrom(this.trackDeck["trckButtons"][i]);
        c4ActiveBtn.copyDataFrom(this.chanStDeck["chstButtons"][i]);
        c4ActiveBtn.copyDataFrom(this.functnDeck["fnctButtons"][i]);
    }
}

// The Assignment buttons are common across decks
// (press+release MARKER button on one deck, press+release MARKER on all decks)
C4DeviceController.prototype.propagateActiveAssignmentsAcrossDecks = function() {
    buttonsDict.name = "c4Buttons";
    var utilBtn = new C4Button(0);
    for(var i = 5; i < 9; i++) {
        var btnDict = buttonsDict.get(i);
        var c4ActiveBtn = utilBtn.newFromDict(btnDict);

        this.bridgeDeck["brdgButtons"][i].copyDataFrom(c4ActiveBtn);
        this.markerDeck["mrkrButtons"][i].copyDataFrom(c4ActiveBtn);
        this.trackDeck["trckButtons"][i].copyDataFrom(c4ActiveBtn);
        this.chanStDeck["chstButtons"][i].copyDataFrom(c4ActiveBtn);
        this.functnDeck["fnctButtons"][i].copyDataFrom(c4ActiveBtn);
    }
}

C4DeviceController.prototype.propagateActiveSpareSignalsAcrossDecks = function() {
    buttonsDict.name = "c4Buttons";
    // Buttons 21 - 31 don't exist on the c4, but they are important spares as "spacer" values in the
    // data structures between the last  c4 regular-button 20 and the first c4 encoder-button 32.
    // Button 21 is an example of how js-objects like these spare buttons can be addressed as Dict values in Max
    // passing patch-specific information to javascript, just by updating the Dict in Max.
    //
    // 21: Button 21 represents this patch's (user selected in 'umenu') External Transport Status where
    // ledValue: ON == Using External Transport, OFF == Using Max Transport
    // pressedValue: Pressed == External RTC Running, Released == External RTC Stopped
    // 22: Button 22 represents a signal between this patch and Markus's C4 remote script for Live
    // "button 22" LED ON == Processing here, OFF == bypassing here (just forwarding)
    // when the script is in USER mode this patch should take over processing midi
    // incoming velocity 127 == START processing midi events here because script is in USER mode
    // incoming velocity   0 == STOP processing midi events here because script is leaving USER mode (forward all events)
    // 23: Button 23 represents this patch's user selected Verbose Sequencer status
    // "button 23" led ON == VERBOSE, led OFF == QUIET
    // A "verbose sequencer" only matters in conjunction with Markus's C4 remote script for Live where
    // If the remote script is in USER mode,
    // - Unless the Spot-Erase button led is ON, the sequencer outputs midi Note messages when the selected transport is running
    // - (just like it does when running "stand alone")
    // If the remote script is NOT in USER mode,
    // - a VERBOSE setting means the sequencer continues outputting midi Note messages when the (external) transport is running,
    // - (NOT updating the C4 display (no CC or SYSEX), just outputting sequenced midi Note messages)
    // - a QUIET setting means the sequencer stops when the mode changes
    // No other "spare buttons" are used like this at this time, propagating all spares anyway.
    var utilBtn = new C4Button(0);
    for (var i = 21; i < ENCODER_BTN_OFFSET; i++) {

        var btnDict = buttonsDict.get(i);
        var c4ActiveBtn = utilBtn.newFromDict(btnDict);

        this.bridgeDeck["brdgButtons"][i].copyDataFrom(c4ActiveBtn);
        this.markerDeck["mrkrButtons"][i].copyDataFrom(c4ActiveBtn);
        this.trackDeck["trckButtons"][i].copyDataFrom(c4ActiveBtn);
        this.chanStDeck["chstButtons"][i].copyDataFrom(c4ActiveBtn);
        this.functnDeck["fnctButtons"][i].copyDataFrom(c4ActiveBtn);
        c4ActiveBtn.propagateOnDutyAssignment();// one call hits same button all decks in "C4DeviceExecutiveController" Dict (c4DeviceControllerDict)
    }
}

C4DeviceController.prototype.determineSavedOnDutyDeckName = function() {
    // all decks share common "Assignment Group" button id (5, 6, 7, 8) data, only need to check one deck
    var myDecks = reqModule.getAllControllerDeckNames()
    var markerLedOFF = this.bridgeDeck["brdgButtons"][5].ledValue === 0;
    var trackLedOFF = this.markerDeck["mrkrButtons"][6].ledValue === 0;
    var chanStLedOFF = this.trackDeck["trckButtons"][7].ledValue === 0;
    var functionLedOFF = this.functnDeck["fnctButtons"][8].ledValue === 0;
    var allAssignmentLedsOFF = markerLedOFF && trackLedOFF && chanStLedOFF && functionLedOFF;
    var rtn = "error";
    if (allAssignmentLedsOFF) {
        rtn = myDecks[0];// "bridgeDeck"
    } else if (!markerLedOFF) {
        rtn = myDecks[1];// "markerDeck"
    } else if (!trackLedOFF) {
        rtn = myDecks[2];// "trackDeck"
    } else if (!chanStLedOFF) {
        rtn = myDecks[3];// "chanStDeck"
    } else if (!functionLedOFF) {
        rtn = myDecks[4];// "functnDeck"
    }
    // post("getControllerActiveDeckKey: returning", rtn);post();
    return rtn;
}


C4DeviceController.prototype.deckToJsonStr = function(deck) {
    deck = deck !== undefined ? deck : "bridgeDeck";
    var objMap = this[deck];
    if (objMap === undefined) {
        post("C4DeviceController.deckToJsonStr: unexpected deck key-name", deck); post();
    }
    return JSON.stringify(objMap);
};
C4DeviceController.prototype.deckCrewToJsonStr = function(crew) {
    crew = crew !== undefined ? crew : "brdgButtons";
    var deck = this.getDeckForCrewNamePrefix(crew);
    var objMap = this[deck][crew];
    if (objMap === undefined) {
        post("C4DeviceController.deckCrewToJsonStr: unexpected crew key-name", crew); post();
    }
    return JSON.stringify(objMap);
};


C4DeviceController.prototype.bang = function() {
    post("This controller"); post();
    // too big for one post() - need to break into chunks
    post(this.toJsonStr()); post();
};
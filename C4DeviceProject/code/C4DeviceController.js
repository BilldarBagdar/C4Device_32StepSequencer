
//
//
//   ---- C4DeviceController js-object definitions -----
//
//

// each "deck" consists of one "officer" and 288 "crew"; 160 buttons, and 128 encoders.
// for all 5 "decks": 1445 total crew and officers; 805 total buttons, 640 total encoders
// The deck crew, the buttons and encoders on each deck, are independent of every other deck crew
// EXCEPT - The state of the "Assignment Group" Buttons (Marker, Track, Chan Strip, Function, and "all group off")
// is common to all decks. (The decks are hierarchically selected. (Precedence: Marker, Track, ChanStrip, Function,
// and "all off"). "Marker" always wins when LED is ON, and "ChanStrip" loses to both "Marker" and "Track" but
// wins over "Function".  "Function" LED ON only wins over "all (Assignment group) LEDs OFF".
//  (Similar to how the Split button LED On states are (1/2, 2/3, 3/3, and "all off"), except the "Assignment LEDs"
//  operate independently of the "deck hierarchy".  "Marker" wins when ON, but when "Marker" turns OFF, the next winner
//  could be any other ON "Assignment LED", "all (group) OFF" comes in last every time.) see commonRequire.js
function C4DeviceController(feedbackStyle) {
    this.name = "C4DeviceExecutiveController";
    this.bridgeDeck = {};
    this.bridgeDeck.brdgButtons = {};
    this.bridgeDeck.brdgEncoders = {};
    this.bridgeDeck.brdgSplit = {};
    this.bridgeDeck.brdgSplit = new C4Button(// officer-of-the-deck
        256, "SPLCNT", BUTTON_RELEASED_VALUE, 0, 0,0, BUTTON_LED_OFF_VALUE);
    this.markerDeck = {};
    this.markerDeck.mrkrButtons = {};
    this.markerDeck.mrkrEncoders = {};
    this.markerDeck.mrkrSplit = {};
    this.markerDeck.mrkrSplit = new C4Button(
        257, "SPLCNT", BUTTON_RELEASED_VALUE, 0, 0,0, BUTTON_LED_OFF_VALUE);
    this.trackDeck = {};
    this.trackDeck.trckButtons = {};
    this.trackDeck.trckEncoders = {};
    this.trackDeck.trckSplit = {};
    this.trackDeck.trckSplit = new C4Button(
        258, "SPLCNT", BUTTON_RELEASED_VALUE, 0, 0,0, BUTTON_LED_OFF_VALUE);
    this.chanStDeck = {};
    this.chanStDeck.chstButtons = {};
    this.chanStDeck.chstEncoders = {};
    this.chanStDeck.chstSplit = {};
    this.chanStDeck.chstSplit = new C4Button(
        259, "SPLCNT", BUTTON_RELEASED_VALUE,0, 0,0, BUTTON_LED_OFF_VALUE);
    this.functnDeck = {};
    this.functnDeck.fnctButtons = {};
    this.functnDeck.fnctEncoders = {};
    this.functnDeck.fnctSplit = {};
    this.functnDeck.fnctSplit = new C4Button(
        260, "SPLCNT", BUTTON_RELEASED_VALUE,0, 0,0, BUTTON_LED_OFF_VALUE);

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
        default: post("getDeckForCrewNamePrefix: unexpected start of crew key-name", crew); post();
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
        default: post("getCrewNamePrefixForDeck: unexpected start of deck key-name", deckName); post();
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
C4DeviceController.prototype.refreshDeckForDuty = function(deckName) {
    c4DeviceControllerDict.name = "C4DeviceExecutiveController";// this.name

    this.propagateActiveSpareSignalsAcrossDecks();
    deckName = deckName !== undefined ? deckName : "bridgeDeck";
    var crewName = this.getCrewNameForDeck(deckName, "Buttons");
    var curDeckButtons = this[deckName][crewName];

    // Restoring updated "Assignment group" status from the Dict data
    // (where C4Button.propagateOnDutyAssignmentChange() puts those updates)
    for(var i = 5; i < 9; i++) {

        var curDeckCtrlBtn = curDeckButtons[i];
        var refreshKeyPrefix = this.getCrewReplaceKeyForDeck(deckName, "Buttons");
        var deckAssignmentKey = "::" + curDeckCtrlBtn.index;
        var key = refreshKeyPrefix + deckAssignmentKey;
        var backingBtnDict = c4DeviceControllerDict.get(key);
        var backingBtn = curDeckCtrlBtn.newFromDict(backingBtnDict);
        curDeckCtrlBtn.copyDataFrom(backingBtn);

        curDeckButtons[i] = curDeckCtrlBtn;
    }
    // Also restoring updated "Split Button LED Cycle" status from the Dict data
    // (where C4Button.propagateOnDutyAssignmentChange() puts those updates)
    crewName = this.getCrewNameForDeck(deckName, "Split");
    var curDeckSplit = this[deckName][crewName];
    var splitRefreshKey = this.getCrewReplaceKeyForDeck(deckName, "Split");
    //post("C4DeviceController.refreshDeckForDuty: getting stored Split button officer of deck from Dict with key", splitRefreshKey); post();
    var backingSplitDict = c4DeviceControllerDict.get(splitRefreshKey)
    var backingSplitBtn = curDeckSplit.newFromDict(backingSplitDict);

    //post("and restoring officer Split button to active Split data for now"); post();
    curDeckSplit.copyDataFrom(backingSplitBtn);
};
C4DeviceController.prototype.propagateActiveSpareSignalsAcrossDecks = function() {
    buttonsDict.name = "c4Buttons";
    // Buttons 21 - 31 don't exist on the c4, but they are important spares as "spacer" values in the
    // data structures between the last  c4 regular-button 20 and the first c4 encoder-button 32.
    // Button 21 is an example of how js-objects like these spare buttons can be addressed as Dict values in Max
    // passing patch-specific information to javascript, just by updating the Dict in Max.
    // Here
    // Button 21 represents this patch's (user selected in 'umenu') External Transport Status where
    // ledValue: ON == Using External Transport, OFF == Using Max Transport
    // pressedValue: Pressed == External RTC Running, Released == External RTC Stopped
    // No other "spare buttons" are used like this at this time, propagating all spares anyway.
    for (var i = 21; i < ENCODER_BTN_OFFSET; i++) {

        var ctrlDeckBtn = this.bridgeDeck["brdgButtons"][i];
        var btnDict = buttonsDict.get(i);
        var c4ActiveBtn = ctrlDeckBtn.newFromDict(btnDict);

        ctrlDeckBtn.copyDataFrom(c4ActiveBtn);
        this.markerDeck["mrkrButtons"][i].copyDataFrom(c4ActiveBtn);
        this.trackDeck["trckButtons"][i].copyDataFrom(c4ActiveBtn);
        this.chanStDeck["chstEncoders"][i].copyDataFrom(c4ActiveBtn);
        this.functnDeck["fnctButtons"][i].copyDataFrom(c4ActiveBtn);
    }
}
C4DeviceController.prototype.deckToJsonStr = function(deck) {
    deck = deck !== undefined ? deck : "bridgeDeck";
    var objMap = this[deck];
    if (objMap === undefined) {
        post("deckToJsonStr: unexpected deck key-name", deck); post();
    }
    return JSON.stringify(objMap);
};
C4DeviceController.prototype.deckCrewToJsonStr = function(crew) {
    crew = crew !== undefined ? crew : "brdgButtons";
    var deck = this.getDeckForCrewNamePrefix(crew);
    var objMap = this[deck][crew];
    if (objMap === undefined) {
        post("deckCrewToJsonStr: unexpected crew key-name", crew); post();
    }
    return JSON.stringify(objMap);
};


C4DeviceController.prototype.bang = function() {
    post("This controller"); post();
    // too big for one post() - need to break into chunks
    post(this.toJsonStr()); post();
};
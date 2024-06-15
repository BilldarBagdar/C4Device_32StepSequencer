
//
//
//   ---- C4DeviceController function object definitions -----
//
//

// each "deck" consists of 160 buttons and 128 encoders,
// for all 5 "decks": 800 total buttons, 640 total encoders
// The deck crew, the buttons and encoders on each deck, are independent of every other deck crew
// EXCEPT - The state of the "Assignment Group" Buttons (Marker, Track, Chan Strip, Function, and "all off")
// is common to all decks. (The decks are hierarchically selected.  "Marker" always wins when LED is ON, and
// "ChanStrip" loses to "Marker" and "Track" but wins over "Function".  "Function" only wins when LED is ON
// over "all LEDs off".
//  (Similar to how the Split button LED On states are (1/2, 2/3, 3/3, and "all off"), except the "Assignment LEDs"
//  operate independently of the "deck hierarchy".  "Marker" wins when ON, but when "Marker" turns OFF, the next winner
//  could be any other ON "Assignment LED", "all OFF" comes in last every time.)
function C4DeviceController(feedbackStyle) {
    this.name = "C4DeviceExecutiveController";
    this.bridgeDeck = {};
    this.bridgeDeck.brdgButtons = {};
    this.bridgeDeck.brdgEncoders = {};
    this.markerDeck = {};
    this.markerDeck.mrkrButtons = {};
    this.markerDeck.mrkrEncoders = {};
    this.trackDeck = {};
    this.trackDeck.trckButtons = {};
    this.trackDeck.trckEncoders = {};
    this.chanStDeck = {};
    this.chanStDeck.chstButtons = {};
    this.chanStDeck.chstEncoders = {};
    this.functnDeck = {};
    this.functnDeck.fnctButtons = {};
    this.functnDeck.fnctEncoders = {};
    for (var i = 0; i < TOTAL_BUTTONS; i++) {
        // only 51 actual buttons 19 + 32
        // only 38ish actual leds [1-3] + 6 + 32
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
    //this.bang();
}

C4DeviceController.prototype.toJsonObj = function() {
    return JSON.stringify(this);
};
C4DeviceController.prototype.deckToJsonObj = function(deck) {
    deck = deck !== undefined ? deck : "bridgeDeck";
    var startsWith = deck.charAt(0);
    switch(startsWith) {
        case "b":
        case "c":
        case "f":
        case "m":
        case "t": break;
        default: post("deckToJsonObj: unexpected start of deck key-name", deck); post();
    }
    var objMap = this[deck];
    if (objMap === undefined) {
        post("deckToJsonObj: unexpected deck key-name", deck); post();
    }
    return JSON.stringify(objMap);
};
C4DeviceController.prototype.deckCrewToJsonObj = function(crew) {
    crew = crew !== undefined ? crew : "brdgButtons";
    var startsWith = crew.charAt(0);
    var deck = "bridgeDeck";
    switch(startsWith) {
        case "b": deck = "bridgeDeck"; break;
        case "c": deck = "chanStDeck"; break;
        case "f": deck = "functnDeck"; break;
        case "m": deck = "markerDeck"; break;
        case "t": deck = "trackDeck"; break;
        default: post("deckCrewToJsonObj: unexpected start of crew key-name", crew); post();
    }
    var objMap = this[deck][crew];
    if (objMap === undefined) {
        post("deckCrewToJsonObj: unexpected crew key-name", crew); post();
    }
    return JSON.stringify(objMap);
};


C4DeviceController.prototype.bang = function() {
    post("This controller"); post();
    // too big for one post() - need to break into chunks
    post(this.toJsonObj()); post();
};
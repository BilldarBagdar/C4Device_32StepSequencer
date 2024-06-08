
// Max global Dicts
var btnStateDict = new Dict("buttonStateChangeCount");
var ledStateDict = new Dict("ledStateChangeCount");
var buttonsDict = new Dict("c4Buttons");
var encodersDict = new Dict("c4Encoders");
var encBtnPressedStateDict = new Dict("encoderBtnPressedData");
var encBtnReleasedStateDict = new Dict("encoderBtnReleasedData");
var encLedRingFeedbackStyleDict = new Dict("ringStyleRef");
var encIndexesByLcdRowDict = new Dict("lcdScreenRowIndexRef");

var reqModule = require("commonRequire");

var THE_BOOK = reqModule.getAllOffsets();
// The current BOOK length is 4 pages (but could easily go to 8 because we have 3 LEDs to count with)
var NBR_DISPLAY_PAGES = THE_BOOK.length;
// THE_BOOK[0] page indexes the c4's 19  "normal" buttons (starting at 0 === THE_BOOK[0])(including spare slots)
// THE_BOOK[1] page indexes the c4's 32 encoders with "encoder" buttons (starting at 32 === THE_BOOK[1])
// THE_BOOK[2] and beyond index pages of "virtual encoders" (and associated "virtual encoder" buttons)
var NBR_PHYSICAL_ENCODERS = THE_BOOK[1];
var ENCODER_FEEDBACK_ID_OFFSET = THE_BOOK[1];
var ENCODER_BTN_OFFSET = THE_BOOK[1];
// example: 32 actual encoders + 96 virtual encoders = 128 encoders modeled across 4 pages
var TOTAL_ENCODERS = NBR_PHYSICAL_ENCODERS * NBR_DISPLAY_PAGES;
var TOTAL_LCD_SCREENS = 4;// ~~(NBR_PHYSICAL_ENCODERS / ENCODERS_PER_LCD_SCREEN);
var ENCODERS_PER_LCD_SCREEN = 8;// ~~(NBR_PHYSICAL_ENCODERS / TOTAL_LCD_SCREENS);
var LCD_BOTTOM_ROW_OFFSET = 56;// 0x38
var TOTAL_BYTES_PER_SYSEX_MSG = 63
var MIDI_CC_ID = 176;
var MIDI_NOTE_ON_ID = 144;
var MIDI_NOTE_OFF_ID = 128;
// "BUCKET SIZE" defines the "fader range" where encoders operate
// incrementing and decrementing a stored value
var BUCKET_EMPTY_VALUE = 0;
var BUCKET_FULL_VALUE = 127;
var BUTTON_RELEASED_VALUE = 0;
var BUTTON_PRESSED_VALUE = 127;
var BUTTON_LED_OFF_VALUE = 0;
var BUTTON_LED_BLINK_VALUE = 1;
var BUTTON_LED_ON_VALUE = 127;
var ENCODER_RING_BTN_LED_ON_OFFSET = 64;
// (21 actual buttons + 11 spares) + (32 actual encoder buttons * 4 modeled encoder button pages) = 160
//  TOTAL_BUTTONS is the "keyset size" of the "buttons" Dict, the largest data store.
var TOTAL_BUTTONS = ENCODER_BTN_OFFSET + TOTAL_ENCODERS;// 32 + 128 = 160
var ABORT_FEEDBACK_SIGNAL = MIDI_NOTE_OFF_ID;// LEDs 1/3, 2/3, and 3/3
var SPLIT_FEEDBACK_IDS = [0, 1, 2];

function setFormattedName(name, prefix) {
    name = name.trim();
    switch (prefix.length) {
        case 0:
        case 1:
        case 2: prefix = "ENX"; break;
        case 3: break;// expecting ENC or ENB
        default: prefix = prefix.substring(0, 3);// possibly UND?
    }
    if(name.length < 6) {
        if (name.length < 5) {
            if (name.length < 4) {
                if (name.length < 3) {
                    if (name.length < 2) {
                        if (name.length < 1) {
                            // 0, < 0, or null
                            name = "000";
                        } else {// exactly 1
                            name = "00" + name;
                        }
                    } else {// exactly 2
                        name = "0" + name;
                    }
                }// else exactly 3
                name = prefix + name;
            } else {// exactly 4?
                name = "." + name + ".";
            }
        } else {// exactly 5?
            name = name + ".";
        }
    } else if (name.length > 6) {
        name = name.substring(0, 6);
    }
    // else name.length is already exactly 6
    return name;
}

// can't import Consts.js here because Consts.js "requires" (the exports from) this file
// all the js code in and imported to C4Device.js "requires" (the exports from) this file
var ledStateDict = new Dict("ledStateChangeCount");
var buttonsDict = new Dict("c4Buttons");
var c4DeviceControllerDict = new Dict("C4DeviceExecutiveController");

var pageOffsets = [0, 32, 64, 96];
var controllerDecks = ["bridgeDeck", "markerDeck", "trackDeck", "chanStDeck", "functnDeck"];

exports.getAllOffsets = function gao() {
	return pageOffsets;
}
exports.getAllControllerDeckNames = function gacdns() {
	return controllerDecks;
}
exports.getPageOffset = function gpo() {
	return getEncoderPageOffset();
}
exports.getActiveControllerDeckName = function gacdn() {
	return getControllerActiveDeckKey();
}
exports.compareSaveData = function csd(dictA, dictB) {
	return deepCompare(dictA, dictB);
}
exports.compareLoadData = function cld(dictA, dictB) {
	return deepCompare(dictA, dictB);
}
exports.areTwoModifiersPressed = function tmap() {
	return twoModifiersArePressed();
}
exports.generateMidiValue = function grmd() {
	return getRandomMidiValue();
}

function getEncoderPageOffset() {
	ledStateDict.name = "ledStateChangeCount";
	// odd values mean led is ON so expression evaluates False
	// even values mean led is OFF so expression evaluates True
	var split0Even = (ledStateDict.get(0) % 2) === 0;
	var split1Even = (ledStateDict.get(1) % 2) === 0;
	var split2Even = (ledStateDict.get(2) % 2) === 0;
	var allLedsOff = split0Even && split1Even && split2Even;
	if (allLedsOff) {
		return pageOffsets[0];
	} else if (!split0Even) {
		return pageOffsets[1];
	} else if (!split1Even) {
		return pageOffsets[2];
	} else if (!split2Even) {
		return pageOffsets[3];
	}
	return 0;// should never reach here to return
}

function getControllerActiveDeckKey() {
	c4DeviceControllerDict.name = "C4DeviceExecutiveController";
	// all decks share common "Assignment Group" button id (5, 6, 7, 8) data, only need to check one deck
	var markerLedOFF = c4DeviceControllerDict.get("bridgeDeck::brdgButtons::5::ledValue") === 0;
	var trackLedOFF = c4DeviceControllerDict.get("bridgeDeck::brdgButtons::6::ledValue") === 0;
	var chanStLedOFF = c4DeviceControllerDict.get("bridgeDeck::brdgButtons::7::ledValue") === 0;
	var functionLedOFF = c4DeviceControllerDict.get("bridgeDeck::brdgButtons::8::ledValue") === 0;
	var allAssignmentLedsOFF = markerLedOFF && trackLedOFF && chanStLedOFF && functionLedOFF;
	var rtn = "error";
	if (allAssignmentLedsOFF) {
		rtn = controllerDecks[0];// "bridgeDeck"
	} else if (!markerLedOFF) {
		rtn = controllerDecks[1];// "markerDeck"
	} else if (!trackLedOFF) {
		rtn = controllerDecks[2];// "trackDeck"
	} else if (!chanStLedOFF) {
		rtn = controllerDecks[3];// "chanStDeck"
	} else if (!functionLedOFF) {
		rtn = controllerDecks[4];// "functnDeck"
	}
	// post("getControllerActiveDeckKey: returning", rtn);post();
	return rtn;
}

function twoModifiersArePressed() {
	buttonsDict.name = "c4Buttons";

	var shiftPressed = buttonsDict.get("13::pressedValue") > 0;
	var optionPressed = buttonsDict.get("14::pressedValue") > 0;
	var controlPressed = buttonsDict.get("15::pressedValue") > 0;
	var altPressed = buttonsDict.get("16::pressedValue") > 0;
	var pressCount = 0;
	pressCount = shiftPressed ? pressCount + 1 : pressCount;
	pressCount = optionPressed ? pressCount + 1 : pressCount;
	pressCount = controlPressed ? pressCount + 1 : pressCount;
	pressCount = altPressed ? pressCount + 1 : pressCount;
	return pressCount > 1;
}

// The controller doesn't get updated as often as the "active" Dicts
function twoModifiersArePressedOnDeck(onDutyDeckName) {

	var refDeck = this.getActiveDeckKey();
	if (onDutyDeckName !== refDeck) {
		post("commonRequire.twoModifiersArePressed: assumption issue, deck names don't agree"); post();
	} else {
		var startsWith = onDutyDeckName.charAt(0);
		var deckCrewNameKey = "brdg";
		switch(startsWith) {
			case "c": deckCrewNameKey = "chst"; break;
			case "f": deckCrewNameKey = "fnct"; break;
			case "m": deckCrewNameKey = "mrkr"; break;
			case "t": deckCrewNameKey = "trck"; break;
			case "b": break;
			default: post("commonRequire.twoModifiersArePressed: unexpected start of deck key-name", onDutyDeckName); post();
		}
		var buttonCrewKey = refDeck + "::" + deckCrewNameKey + "::";
		var shiftPressed = c4DeviceControllerDict.get(buttonCrewKey + "13::pressedValue") > 0;
		var optionPressed = c4DeviceControllerDict.get(buttonCrewKey + "14::pressedValue") > 0;
		var controlPressed = c4DeviceControllerDict.get(buttonCrewKey + "15::pressedValue") > 0;
		var altPressed = c4DeviceControllerDict.get(buttonCrewKey + "16::pressedValue") > 0;
		var pressCount = 0;
		pressCount = shiftPressed ? pressCount + 1 : pressCount;
		pressCount = optionPressed ? pressCount + 1 : pressCount;
		pressCount = controlPressed ? pressCount + 1 : pressCount;
		pressCount = altPressed ? pressCount + 1 : pressCount;
		return pressCount > 1;
	}
	return false;
}

function getRandomMidiValue() {
	var milliTime = max.time;// Current max scheduler time floating point value in milliseconds
	var pseudoRand = Math.random() * 1000;// random value is between 0 and 1
	var rando = milliTime * pseudoRand;
	return ~~(rando % 128);
}

// scraped from: https://stackoverflow.com/questions/26049303/how-to-compare-two-json-have-the-same-properties-without-order
// but order in arrays does matter in this implementation - and we want that behavior in the JSON comparison before saving a data file.
// For example, the array of "button objects" in every "deck" dictionary should always be in the same numerical order.
function deepCompare(arg1, arg2) {
	if (Object.prototype.toString.call(arg1) === Object.prototype.toString.call(arg2)){
		if (Object.prototype.toString.call(arg1) === '[object Object]' || Object.prototype.toString.call(arg1) === '[object Array]' ){
			if (Object.keys(arg1).length !== Object.keys(arg2).length ){
				return false;
			}
			return (Object.keys(arg1).every(function(key){
				return deepCompare(arg1[key],arg2[key]);
			}));
		}
		return (arg1===arg2);
	}
	return false;
}

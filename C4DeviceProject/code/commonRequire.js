
// can't import Consts.js here because Consts.js "requires" (the exports from) this file
// all the js code in and imported to C4Device.js "requires" (the exports from) this file
var ledStateDict = new Dict("ledStateChangeCount");
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

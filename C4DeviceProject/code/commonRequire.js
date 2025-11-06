
// can't import Consts.js here because Consts.js "requires" (the exports from) this file
// all the js code in and imported to C4Device.js "requires" (the exports from) this file
var ledStateDict = new Dict("ledStateChangeCount");
var buttonsDict = new Dict("c4Buttons");
var c4DeviceControllerDict = new Dict("C4DeviceExecutiveController");

var pageOffsets = [0, 32, 64, 96];
var controllerDecks = ["bridgeDeck", "markerDeck", "trackDeck", "chanStDeck", "functnDeck"];

var C4DeviceObj = undefined;
var LibrarianObj = undefined;

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

exports.setC4DeviceObj = function sc4d(deviceRef) {
    setC4Device(deviceRef);
}
exports.setLibrarianObj = function slo(libRef) {
    setLibrarian(libRef);
}
exports.getC4DeviceObj = function gc4d(caller) {
    return getC4Device(caller);
}
exports.getLibrarianObj = function glo(caller) {
    return getLibrarian(caller);
}
exports.isC4DeviceObjValid = function ic4dv() {
    return isC4DeviceValid();
}
exports.isLibrarianObjValid = function ilv() {
    return isLibrarianValid();
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

// The JS object with scripting name C4Device is in a top level patcher (C4Device_32StepSequencer.maxpat) or
// (the same patcher) in a "bpatcher" sub-patcher in a top level patcher (openSequencerBypassing.maxpat for example)
// The JS object with scripting name librarian is always in a top level patcher (ExecutiveControllerDictLibrarian.maxpat)
//
// Although the JS objects (C4Device, librarian) share project code files like this file, both objects maintain unique instances
// of those "code objects" at runtime.  They may seem to share object instances too, but that's not true (or only true because
// they do share Dict data).  For example, both "C4Device" and "librarian" can only "set" their own valid "Maxobj" reference,
// neither can ever "get" a valid "Maxobj" reference for the other. Because each maintains its own copy of this "common" data.
// Therefore, this code can only search the Max runtime environment to successfully locate valid "Maxobj" references to
// pass around as available.
function getMaxobjReference(scriptingName, caller) {
    var topPatcher = max.frontpatcher;
    var topPatcherCount = 1;
    var rtn;
    var keepLooking = true;
    // var m = ["getMaxobjReference:", caller,  "looking for maxobj with scriptingName",
    //     scriptingName, "at max.time", max.time].join(" ");
    // post(m);post();
    while (topPatcher && keepLooking) {
        // m = ["getMaxobjReference:", caller,  "top patcher", topPatcherCount, "at filepath",
        //     topPatcher.filepath, "contains", topPatcher.count, "maxobj objects"].join(" ");
        // post(m);post();
        var maxObj = topPatcher.getnamed(scriptingName);
        if (maxObj) {
            rtn = maxObj;// "this" js Maxobj with scripting name "patcherAjs" for example
            // m = ["getMaxobjReference:", caller,  "found maxobj with scriptingName", scriptingName,
            //     "by getnamed in top-patcher", topPatcherCount].join(" ");
            // post(m);post();
            keepLooking = false;
            break;
        } else {
            maxObj = topPatcher.firstobject;
            var maxObjCount = 1;
            while (maxObj) {
                // m = ["getMaxobjReference:", caller,  "max object", maxObjCount,  "in patcher has varname",
                //     maxObj.varname ? maxObj.varname : "undefined", "and name",
                //     maxObj.name ? maxObj.name : "undefined"].join(" ");
                // post(m);post();
                var bPatcher = maxObj.subpatcher();
                if (bPatcher) {
                    // m = ["getMaxobjReference:", caller,  "sub patcher name",
                    //     bPatcher.name ? bPatcher.name : "undefined", "and varname",
                    //     bPatcher.varname ? bPatcher.varname : "undefined",
                    //     "of top patcher", topPatcherCount].join(" ");
                    // post(m); post();
                    var bMaxObj = bPatcher.getnamed(scriptingName);
                    if (bMaxObj) {
                        rtn = bMaxObj;
                        // m = ["getMaxobjReference:", caller,  "found maxobj with scriptingName", scriptingName,
                        //     "by getnamed in sub-patcher under top-patcher", topPatcherCount].join(" ");
                        // post(m);post();
                        keepLooking = false;// break outer loop too (necessary?)
                        break;
                    }
                } else {
                    //  redundant check here, if a valid reference exists, the topPatcher.getnamed(scriptingName)
                    //  call above should have already found this object reference by scriptingName (before iterating
                    //  over all patcher maxobjects individually)
                    if (maxObj.varname === scriptingName && maxObj.valid) {
                        rtn = maxObj;// "this" js Maxobj with scripting name "patcherBjs" for example
                        // m = ["getMaxobjReference:", caller,  "found maxobj with scriptingName", scriptingName,
                        //     "by iterating objects? in top-patcher at maxobjCount", maxObjCount].join(" ");
                        // post(m);post();
                        keepLooking = false;
                        break;
                    }
                }
                maxObj = maxObj.nextobject;
                maxObjCount++;
            }
        }
        var patcherWind = topPatcher.wind;
        var nextWindow = patcherWind.next;
        topPatcher = nextWindow ? nextWindow.assoc : undefined;
        topPatcherCount++;
    }
    return rtn;
}
getMaxobjReference.local = 1;

// setters only work "self referentially" because this file isn't "shared" across js silos,
// see getMaxobjReference method above
function setC4Device(deviceRef) {
    C4DeviceObj = deviceRef;
}
function setLibrarian(deviceRef) {
    LibrarianObj = deviceRef;
}
function getC4Device(caller) {
    if (!isC4DeviceValid()) {
        // note: since this file is "required" by consts.js (and every file that includes consts.js),
        // this file can only use constants from consts.js declared before the line where this file is "required" (line 18).
        C4DeviceObj = getMaxobjReference(C4DEVICE_SCRIPTING_NAME, caller);
    }
    return C4DeviceObj;
}
function getLibrarian(caller) {
    if (!isLibrarianValid()) {
        LibrarianObj = getMaxobjReference(LIBRARIAN_SCRIPTING_NAME, caller);
    }
    return LibrarianObj;
}
function isC4DeviceValid() {
    return C4DeviceObj !== undefined && C4DeviceObj.valid;
}
function isLibrarianValid() {
    return LibrarianObj !== undefined && LibrarianObj.valid;
}

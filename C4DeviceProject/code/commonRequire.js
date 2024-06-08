
// can't import Consts.js here because Consts.js "requires" (the exports from) this file
// all the js code in and imported to C4Device.js "requires" (the exports from) this file
var ledStateDict = new Dict("ledStateChangeCount");


var pageOffsets = [0, 32, 64, 96];

exports.getAllOffsets = function gao() {
	return pageOffsets;
}
exports.getPageOffset = function gpo() {
	return getEncoderPageOffset();
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
		//post("getEncoderPageOffset returning page 0 offset", pageOffsets[0]);
		return pageOffsets[0];
	} else if (!split0Even) {
		//post("page Offset returning page 1 offset", pageOffsets[1]);
		return pageOffsets[1];
	} else if (!split1Even) {
		//post("page Offset returning page 2 offset", pageOffsets[2]);
		return pageOffsets[2];
	} else if (!split2Even) {
		//post("page Offset returning page 3 offset", pageOffsets[3]);
		return pageOffsets[3];
	}
	return 0;// should never reach here to return
}

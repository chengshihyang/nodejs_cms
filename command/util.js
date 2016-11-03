var execSync = require('child_process').execSync;

function decodeHex(str){
	str = str.toUpperCase().replace(new RegExp("s/[^0-9A-Z]//g"));
	var result = "";
	var nextchar = "";
	for (var i=0; i<str.length; i++){
		nextchar += str.charAt(i);
		if (nextchar.length == 2){
			result += ntos(hexv[nextchar]);
			nextchar = "";
		}
	}
	return result;
}

//module.exports.decodeHex = decodeHex;

module.exports.base64hv = function(value1, value2) {
	var hv = sha1(value1 + value2);
	var hexhv = encode.decodeHex(hv);
	var result = encode.encodeBase64(hexhv);
	return result;
}

module.exports.execSyncEx = function execSyncEx(command, exec_option, callback, errCallback, req) {
	try {
		console.log(command);
                var result = execSync(command, exec_option);
		result = result.toString();
		var resp = JSON.parse(result);
		callback(req, resp);
	} catch (e) {
		errCallback(req, e);
	}
}

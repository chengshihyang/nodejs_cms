
var router = {
	get : require('./command/get.js'),
	post : require('./command/post.js')
}


function route_command(req, success, failure) {
	try {
		var parsed = JSON.parse(req);
		console.log(parsed);
		if ( parsed && parsed["method"] && typeof parsed["method"]==='string' ) {
			var cmd_handler = router[parsed["method"].toLowerCase() ];
			if (cmd_handler) {
				if (typeof cmd_handler.resolve ==='function') {
					cmd_handler.resolve(req, success, failure);
				}
			}
			else {
				console.log("unabled to find command handler: " + parsed["method"]);
			}
			//router["post"].resolve("test");
		}
	}
	catch (e) {
		failure("parse json error");
	}
}


//example
function success_callback() {
	console.log("success callback");
}

function failure_callback() {
	console.log("failure callback");
}

var req='{"jsonrpc":"2.0","method":"GET","params":{"uri":"/v3/device/system/version"},"id":1285433}'
//var req='{"jsonrpc":"2.0","method":"BIND","params":{"uri":"/v3/device/system/version"},"id":1285433}'
route_command(req, success_callback, failure_callback);



var router = { 
	get : require('./command/get.js'),
	post : require('./command/post.js'),
	bind : require('./command/bind.js'),
	register : require('./command/register.js'),
}


function route_command(req, success, failure) {
	try {
		var parsed = JSON.parse(req);
		console.log(parsed);
		if ( parsed && parsed["method"] && typeof parsed["method"]==='string' ) {
			var cmd_handler = router[parsed["method"].toLowerCase() ];
			if (cmd_handler) {
				if (typeof cmd_handler.resolve ==='function') {
					cmd_handler.resolve(parsed, success, failure);
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

module.exports.route_command = route_command;

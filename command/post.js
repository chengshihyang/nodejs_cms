var command = {
	"/v3/device/system/version" : require('./v3/device/system/version.js').post,
	"/v3/device/system/binding" : require('./v3/device/system/binding.js').post,
}

var scripts = {
	"/v3/device/system/version" : './scripts/post/device_system_version.sh',
	"/v3/device/system/binding" : './script/post/device_system_binding.sh',
}

exports.resolve = function (req, success, failure) {
        console.log("get req: " + req);
	        console.log("uri: " + req['params']['uri']);

        //check url
        //build options
	var url=req['params']['uri'];
	var options = {
		exec_script: scripts[url]
	}

	//execute command
	command[url](req, options, success, failure);
}

var command = {
	"/v3/device/system/version" : require('./v3/device/system/version.js').get,
	"/v3/device/system/reboot" : require('./v3/device/system/reboot.js').get,
	"/v3/net/clients/authentication" : require('./v3/net/clients/authentication.js').get,
}
var scripts = {
	"/v3/device/system/version" : './scripts/get/device_system_version.sh',
	"/v3/device/system/reboot" : './scripts/get/device_system_reboot.sh',
	"/v3/net/clients/authentication" : './scripts/get/net_clients_authentication.sh',
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

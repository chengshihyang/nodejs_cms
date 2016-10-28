var command = {
	"/v3/device/system/version" : require('./system/version.js')
}


exports.resolve = function (req, success, failure) {
	console.log("get req: " + req);
	//sanity the url
	
	command["/v3/device/system/version"](req, success, failure);
}

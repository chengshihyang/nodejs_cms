var util = require('../../../util');

module.exports.get = function get(req, options, callback, errCallback) {
	console.log('get request version');
	util.execSyncEx(options.exec_script, {timeout:5000}, callback, errCallback, req);
}

module.exports.post = function post(req, options, callback, errCallback) {
	console.log('post request version');
	util.execSyncEx(options.exec_script, {timeout:5000}, callback, errCallback, req);
}


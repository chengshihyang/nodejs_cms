var util = require('../../../util');
var fs = require('fs');
const DEVICE_CONF_FILE = './config/device.config';

module.exports.post = function post(req, options, callback, errCallback) {
	console.log('post system binding');
        var configInfo = JSON.parse(fs.readFileSync(DEVICE_CONF_FILE).toString());


	configInfo['cuid'] = req['params']['data']['cuid'];
	configInfo['cKey'] = req['params']['data']['privateKey'];

	console.log(JSON.stringify(configInfo));
	fs.writeFile(DEVICE_CONF_FILE, JSON.stringify(configInfo), function (err) {
		if (err) {
			return errCallback(req, null);
		}
		return callback(req, null);
	});

	//util.execSyncEx(options.exec_script, {timeout:5000}, callback, errCallback, req);
}


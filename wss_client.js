var WebSocket = require('ws');
var wssRouter = require('./wssrouter');
var crypto = require('crypto')
var fs = require('fs');
var ws = null;
var subProtocol;
var server_url;

var pingTimerCnt=0;
var wssOption = {
	protocolVersion: 8
};

//shasum.update(wssClientInfo.cuid + wssClientInfo.cKey)
//var sha1sum=shasum.digest('base64')
//console.log(sha1sum)

function websocketClient() {
	if (ws===null) {
		var server_url;
		var wssClientInfo = JSON.parse(fs.readFileSync('./config/device.config').toString());

		if (wssClientInfo.cuid && wssClientInfo.cKey && !wssClientInfo.hv) {
			var shasum = crypto.createHash('sha1');
			shasum.update(wssClientInfo.cuid + wssClientInfo.cKey);
			var sha1sum=shasum.digest('base64');
			console.log(sha1sum);

			wssClientInfo.hv = sha1sum;
			subProtocol = 'deviceServ';
			server_url = wssClientInfo.server_url 
				+ "?cuid=" + wssClientInfo.cuid 
				+ "&hv=" + wssClientInfo.hv 
				+ "&model=" + wssClientInfo.model 
				+ "&version=" + wssClientInfo.version;
		}
		else if (!wssClientInfo.cuid && !wssClientInfo.cKey && wssClientInfo.sn) {
			var mac='74:19:f8:e0:2d:84';
			var shasum = crypto.createHash('sha1');
			shasum.update(wssClientInfo.sn + mac);
			var sha1sum=shasum.digest('hex');
			console.log(sha1sum);

			wssClientInfo.hv = sha1sum;
			subProtocol = 'deviceReg';
			server_url = wssClientInfo.server_url 
				+ "?ac=" + wssClientInfo.sn
				+ "&hv=" + wssClientInfo.hv 
		}

		console.log('subProtocol:' + subProtocol);
		console.log('server_url:' + server_url);

		if (subProtocol && server_url) {
			ws = new WebSocket(server_url, subProtocol, wssOption);
			ws.on('error', function error(err) {
				console.log(err);
			});
						
			ws.on('ping', function ping(data) {
				console.log("get ping") ;
				pingTimerCnt=0;
			});
							
			ws.on('open', function open() {
				console.log('connected');
				pingTimerCnt=0;
			});
							
			ws.on('close', function close() {
				console.log('disconnected');
				pingTimerCnt = 0;
				ws = null;
			});
						
			ws.on('message', function message(data, flags) {
				console.log(data);
				wssRouter.route_command(data, commandSuccess, commandFailure);
			});
		}
	}
	else {
		console.log("ws not null, readyState:" + ws.readyState);
		if (ws.readyState==WebSocket.OPEN) {
			pingTimerCnt ++;
			console.log("pingTimercnt:" + pingTimerCnt);
			if (pingTimerCnt >= 8) {
				ws.close(1001, "ping time out");
			}
		}
	}


	function commandSuccess(req, result) {
		var resp = {
			jsonrpc: req['jsonrpc'],
			id: req['id'],
			result: result,
		}
	
		if (ws) {
			var json_resp=JSON.stringify(resp);	
			console.log('success: ' + json_resp);
			ws.send(json_resp, {mask: true});
		}
		else {
		}
	}
	        
	function commandFailure(req, err) {
		console.log('failure: ' + err);
		console.log('failure: ' + JSON.stringify(req));
	}
}

setInterval( function() {
	websocketClient();
}, 5000);


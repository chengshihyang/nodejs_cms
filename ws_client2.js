var WebSocket = require('ws');
var ws = null;
var pingTimerCnt=0;

function websocketClient() {
	ws = new WebSocket('ws://10.30.16.1:8080/', 'echo-protocol', {
		protocolVersion: 8,
	 	origin: 'http://websocket.org'
	});
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
		ws.send(Date.now().toString(), {mask: true});
	});
					
	ws.on('close', function close() {
		console.log('disconnected');
		pingTimerCnt = 0;
		ws = null;
	});
				
	ws.on('message', function message(data, flags) {
		console.log("data: " + data);
		console.log("flags: " + JSON.stringify(flags));
	});

}



setInterval( function() {
	if (ws === null) {
		console.log("ws is null");
		websocketClient();
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

	//console.log(process.memoryUsage());
}, 1000);






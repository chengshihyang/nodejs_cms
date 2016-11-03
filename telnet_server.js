var telnet = require ('telnet')

telnet.createServer(function (client) {
	client.do.transmit_binary();
	client.do.window_size();
	client.on('window_size', function(e) {
		console.log(e);
		if (e.command === 'sb') {
			console.log('telnet window resize to %d x %d', e.width, e.height);
		}
	});
	client.on('data', function (b) {
		//client.write(b);
		//console.log(b);
		//if (b.readUInt8(0) === 3) {
		//	client.end();
		//}
	});
	client.write('\n Connected to Telnet server!\n');
}).listen(23)

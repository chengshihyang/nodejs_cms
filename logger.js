var tickId = require('tick-Id');
var winston = require('winston');
winston.emitErrs = true;

var logger = new winston.Logger({
	transports: [
		new winston.transports.File({
		level: 'info',
		        filename: './logs/all-logs.log',
	                handleExceptions: true,
	                json: true,
	                maxsize: 2242880, //5MB
	                maxFiles: 3,
	                colorize: false
	        }),
	        new winston.transports.Console({
	                level: 'debug',
	                handleExceptions: true,
	                json: false,
	                colorize: true
		})
	],
	exitOnError: false
});

module.exports = logger;
module.exports.stream = {
	write: function(message, encoding){
		logger.info(message);
        }
};

function myTimer() {
	for (var i=0; i<100; i++) {
	  var tickId1 = tickId();
	  var tickId2 = tickId();
	  logger.info('Hello world ', tickId1);
	  logger.debug('Debugging info ', tickId2);
	}
}

setInterval(myTimer, 200);


var async=require('async');
var users = "";
var cmdarray = [
	{cmd: "ls",   delay: 5000},
	{cmd: "pwd",  delay: 5000},
	{cmd: "time", delay: 1000},
]

// Pretend this is some complicated async factory
var createUser = function(id, callback) {
        callback(null, id);
};

// generate 5 users
async.timesSeries(cmdarray.length, function(n, callback) {
	console.log(cmdarray[n].cmd);
	setTimeout(createUser, cmdarray[n].delay, n, callback);
}, function(err, users) {
	// we should now have 5 users
	console.log(users);
});

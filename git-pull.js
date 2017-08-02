<<<<<<< HEAD
var exec = require('child_process').exec;
var cmd = 'sudo git pull origin master';
setInterval(function () {
    exec(cmd, function (err, stdout, stderr) {
        return console.log(stdout);
    });
}, 30000);
=======
var exec = require('child_process').exec;
var cmd = 'sudo git pull origin master';
setInterval(function () {
    exec(cmd, function (err, stdout, stderr) {
        return console.log(stdout);
    });
}, 30000);
>>>>>>> fb0448487e142c1495b3b0175d0b50fca05f51fd

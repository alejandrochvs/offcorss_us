var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require('mongoose');
var mongoURL = process.env.MONGODB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/offcorss_us';

var users = require('./user_model.js');
router.post('/',function(req,res){
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoURL);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        var user = new users(req.body);
        user.time = new Date();
        user.save(function(err,saved){
            if (err && err.code !== 11000) {
                mongoose.connection.close();
                return res.send(err);
            }
            if (err && err.code === 11000) {
                mongoose.connection.close();
                return res.send('11000');
            }
            res.send(200);
            mongoose.connection.close();
        });
    });
})
/*var mysql = require('mysql');*/
/*var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'offcorss_us'
});
con.connect(function (err) {
    if (err) {
        con.end();
        return console.log(err);
    }
    console.log("Connected to mysql db.");
    router.use('/', function (req, res) {
        var request = req.body;
        var sql = "INSERT INTO users (name,last_name,mail,state,phone) VALUES ('" + request.name + "','" + request.last_name + "','" + request.mail + "','" + request.state + "','" + request.phone + "')";
        con.query(sql, function (err, result) {
            if (err){
                if (err.errno == 1062){
                    return res.send('1062');
                }
                return res.send(err);
            }
            res.sendStatus(200);
        });
    });
});*/
module.exports = router;
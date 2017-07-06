var express = require('express');
var app = express();
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
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
});
module.exports = router;
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var path = require('path');
var urlEncodedParser = bodyParser.urlencoded({
    extended: false
});
var port = process.env.PORT || 80;
var registerUS = require('./routes/registerUS');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname ,'/public')));
app.use('/register',urlEncodedParser,registerUS);
app.listen(port,function(err){
    if (err){
        return console.error(err);
    }
    console.log('App listening on port ' + port);
});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: {
        type: String,
    },
    last_name: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
        unique : true
    },
    state: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
});
var users = mongoose.model('users', userSchema);
module.exports = users;
CREATE TABLE Persons (
    name varchar(255),
    last_name varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255) 
);

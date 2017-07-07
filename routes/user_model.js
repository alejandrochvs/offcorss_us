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
        type: Number,
        required: true
    },
    time: {
        type: Date,
        required: true
    }
});
var users = mongoose.model('users', userSchema);
module.exports = users;

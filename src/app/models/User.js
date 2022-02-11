const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    username: {type: String, required: true, max: 10, unique: true},
    password: {type: String, required: true, min: 6},
    email: {type: String, required: true, max: 50, unique: true},
    level: {type: String, required: true, max: 50},

}, {timestamps: true}
)

module.exports = mongoose.model('User', UserSchema, 'user')
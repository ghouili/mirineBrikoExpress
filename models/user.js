const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    name: {type: String, },
    cin: {type: Number,},
    password: {type: String, require: true},
})

module.exports = mongoose.model('user', UserSchema)
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    emailID: {type: String, unique: true},
    password: {type: String, required: true},
    age: {type: Number},
    gender: {type: String},
})


const User = mongoose.model('User', schema);
module.exports = User;
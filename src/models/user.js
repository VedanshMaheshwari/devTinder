const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    emailID: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    age: {type: Number, required: true},
    gender: {type: String, required: true},
})


const User = mongoose.model('User', schema);
module.exports = User;
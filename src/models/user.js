const mongoose = require('mongoose');
var validator = require('validator');

const schema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    emailID: {type: String,lowercase:true, required: true, unique: true},
    password: {
        type: String, 
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password is not strong enough!");
            }
        }
    },
    
        age: {type: Number, min: 18, max: 100},
    
    gender: {type: String, validate(value){
        if(!["Male", "Female", "Other"].includes(value)){
            throw new Error("Gender is not valid!");
        }
    }},
    photoUrl: {type: String, default: "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" },
    about: {type: String, default: "This is the default about the user! " },
    skills: {type: [String] },
    },
    { 
        timestamps: true 
    }
)


const User = mongoose.model('User', schema);
module.exports = User;
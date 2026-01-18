const mongoose = require('mongoose');
const { use } = require('react');
var validator = require('validator');

const userSchema = new mongoose.Schema({
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

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id}, "DEVTINDERSECRETKEY",{ expiresIn: '7d' });
    return token;
}

userSchema.method.validatePassword = async function(password){
    const user = this;
    const passwordHash  = user.password;
    const isPasswordValid = await bcrypt.compare(password, passwordHash);

    return isPasswordValid; 
}


const User = mongoose.model('User', schema);
module.exports = User;
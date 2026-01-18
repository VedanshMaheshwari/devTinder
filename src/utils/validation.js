const validator = require('validator');

const validateSignUpData = (req) => {
    const {firstName, lastName, emailID, password} = req.body;
    
    if(!firstName || !lastName){
        throw new Error("First Name and Last Name are required");
    }
    else if(!validator.isEmail(emailID)){
        throw new Error("Invalid Email ID");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough!");
    }    
}


module.exports = {
    validateSignUpData,
};

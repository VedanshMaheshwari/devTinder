const jwt = require('jsonwebtoken');

const userAuth = async (req, res, next) => {
    //Read the token from req cookies
    try{const cookies = req.cookies;
    const {token} = cookies;
    if(!token){
        throw new Error("Invalid Token");
    }

    //Verify the token
    const decoded = await JsonWebTokenError.verify(token, "DEVTINDERSECRETKEY");
    const {_id} = decoded;

    //Find user from the token
    const user = await User.findById(_id);
    if(!user){
        throw new Error("User not found");
    }   

    req.user = user; //attach user to req object
    req.token = token; //attach token to req object
    next();
    }
    catch(err){
        res.status(500).send("Authentication Error: " + err.message);
    }
}

module.exports = { 
    adminAuth, 
    userAuth,
};
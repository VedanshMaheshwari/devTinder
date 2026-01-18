const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require('./Middlewares/auth');


app.use(express.json());
app.use(cookieParser());

//Push data in DB - SIGNUP
app.post("/signup", async (req,res)=>{
    try{
        //Validation of data
        validateSignUpData(req);
        //Encrypt the password
        const {firstName, lastName, emailID, password} =  req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;

        //Dyanamically creating user from request body
        const user = new User({
            firstName,
            lastName,
            emailID,
            password: hashedPassword,
        });
        await user.save();
        console.log("User signed up:", user);
        res.send("User signed up successfully");
    }catch(err){
        res.status(400).send("Error signing up user: " + err.message);
    }
    // const obj = new User({
    //     firstName: "John",
    //     lastName: "Doe",
    //     emailID: "john@gmail.com",
    //     password: "password123",
    //     age: 30,
    //     gender: "Male",
    // });

    // try{
    //     await obj.save();
    //     res.send("User signed up successfully");
    // }catch(err){
    //     res.status(400).send("Error signing up user: " + err.message);
    // }
}) 

//LOGIN
app.post("/login", async (req , res)=>{
    console.log("Request body:", req.body);    
    try{
        const {emailID, password} = req.body;
        const user = await User.findOne({emailID});
        if(!user){
            return res.status(400).send("Invalid Email ID or Password");
        }
        const isPasswordValid = await user.validatePassword(password);
         
        if(isPasswordValid){
            //create a JWT token
            const token = await user.getJWT();
            //add token to cookies or send in response back to user
            res.cookie('token', token); 
            res.send("User logged in successfully");
        }        
        
        if(!isPasswordValid){
            return res.status(400).send("Invalid Email ID or Password");
        } 
        
    }catch(err){
        res.status(500).send("Error logging in user: " + err.message);
    }                      
});

//Profile after login
app.get("/profile",userAuth, async (req,res)=> {
    try{
        const user = req.user;
        const token = req.token;
        // if(!user){
        //     throw new Error("User not found");
        // }
        //NO NEED TO FETCH USER AGAIN AS userAuth MIDDLEWARE WILL DO IT (attached to req object)
        res.send(user);
    }
    catch(err){
        res.status(500).send("Error fetching profile: " + err.message);
    }
});

//Read data from DB
app.get("/feed", async (req,res)=>{
    try{
        const users = await User.find({});
        res.json(users);        
    }
    catch(err){
        res.status(500).send("Error fetching users: " + err.message);
    }
});


app.patch("/user/:userID", async (req,res)=> {    
    const data = req.body;
    const userID = req.params?.userID;

    const ALLOWED_UPDATE = [
        "photoUrl", "about","gender","age" 
    ]

    const isUpdateAllowed = Object.keys(data).every((k) => 
        ALLOWED_UPDATE.includes(k)
    );

    if(!isUpdateAllowed){
        throw new Error("Update not allowed");
    }

    try{
        const user = await User.findByIdAndUpdate({id: data.userId}, data, {
            returnDocument: 'after', 
            runValidators: true
        });
    }
    catch(err){
        res.status(500).send("Error updating user: " + err.message);
    }
})


app.delete('/user', async (req, res) => {
    const userId = req.body.userId;
    try {
        await User.findByIdAndDelete(userId);
        res.send('User deleted successfully');
    } catch (err) { 
        res.status(500).send('Error deleting user: ' + err.message);
    }
});

connectDB().then(()=>{
    console.log('Database connected successfully');
    app.listen(7777, () => {
        console.log('Server is running on port 7777');
    });
})
.catch((err)=>{
    console.error('Database connection failed:', err);
});


 
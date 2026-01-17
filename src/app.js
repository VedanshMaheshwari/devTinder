const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/User");

app.post("/signup", async (rew,res)=>{
    //Dyanamically creating user from request body
    const user = new User(req.body);

    try{
        await user.save();
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


connectDB().then(()=>{
    console.log('Database connected successfully');
    app.listen(7777, () => {
        console.log('Server is running on port 7777');
    });
})
.catch((err)=>{
    console.error('Database connection failed:', err);
});


 
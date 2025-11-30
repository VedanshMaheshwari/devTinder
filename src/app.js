const express = require('express');

//instance of express js 
const app = express();

app.get("/user", (req, res) => {
    console.log(req.query);
    res.send('Retrived user data from database');
});

app.post("/user", (req, res, next) => {
    res.send('Data received at database');
});

app.use("/test", (req, res) => {
    res.send('Hello from the test route!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

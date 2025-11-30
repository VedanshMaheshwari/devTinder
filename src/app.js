const express = require('express');

//instance of express js 
const app = express();

app.use("/", (req, res, next) => {
    res.send('Hello from the dashboard!');
});

app.use("/test", (req, res) => {
    res.send('Hello from the test route!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

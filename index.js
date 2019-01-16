const express = require('express');

const port = process.env.PORT || 5050;

const app = express();

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use((req,res,next)=> {
    res.send('Welcome to Express');
});

app.listen(port, () => {
    console.log(`Port running on ${port}`)
});
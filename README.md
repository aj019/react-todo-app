# react-todo-app
A simple todo app using react , mongodb, express and node.js

# Steps
## Setting up server
1. Make a new directory named react-todo-app
2. cd react-todo-app
3. npm init
4. npm i express nodemon dotenv
5. Create index.js inside react-todo-app
6. In Index.js
```const express = require('express');

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
```
7. To run the server run nodemon index.js in terminal

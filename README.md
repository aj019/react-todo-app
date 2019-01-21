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

## Adding Models & Routes

8. Create a folder called routes
9. Inside routes create a folder models with file Todo.js
10. Install mongoose : npm i mongoose
11. In Todo.js
```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Todo Schema

const TodoSchema = new Schema({
    action : {
        type : String,
        required : ['true','The todo text field is required']
    }
});

const Todo = mongoose.model('todo',TodoSchema);

module.exports = Todo;
```
12. Inside routes create a folder api with file todo.js
```
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');


router.get('/todos', (req,res) => {
    Todo.find({},'action')
        .then(data => res.json(data));
        
});

router.post('/todos', (req,res) => {
    if(req.body.action){
        Todo.create(req.body)
            .then(data => res.json(data))
    } else {
        res.json({
            error: "The input field is empty"
        })
    }
});

router.delete('/todos/:id', (req, res, next) => {
    Todo.findOneAndDelete({"_id": req.params.id})
      .then(data => res.json(data))
      .catch(next)
  })  

module.exports = router;
```
## Setup Database

13. Create a new mongodb deployment on mlab and add a user to the mongodb instance
14. Create a .env file in your react-todo-app folder and set DB= to your deployment url
``` 
DB = 'mongodb://<DB_USER>:<DB_PASS>0@ds159204.mlab.com:59204/todo-app-db'
```
15. Modify your index.js to connect to database
```
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/api/todo');

require('dotenv').config();

const port = process.env.PORT || 5050;

const app = express();

//connect to database

mongoose.connect(process.env.DB, {useNewUrlParser: true})
        .then(() => console.log('Database connected'))
        .catch(err => console.log(err));

app.use(bodyParser.json());
app.use('/api',routes);

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.listen(port, () => {
    console.log(`Port running on ${port}`)
});
```
16. Test your api is working by visiting http://localhost:5000/api/todos

## Creating Frontend

17. In root directory run create-react-app client
18. npm install concurrently
19. Update the package.json of your root folder with the following
```
{
  "name": "react-todo-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "concurrently \"yarn run start\" \"cd client && yarn start\""
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.18.3",
    "dotenv": "^6.2.0",
    "express": "^4.16.4",
    "mongoose": "^5.4.4",
    "path": "^0.12.7"
  },
  "devDependencies": {
    "concurrently": "^4.0.1",
    "nodemon": "^1.18.4"
    }

}
```
20. Add "proxy": "http://localhost:5000" in your client/package.json to support relative urls

```
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "axios": "^0.18.0",
    "react": "^16.7.0",
    "react-dom": "^16.7.0",
    "react-scripts": "2.1.3",
    "styled-components": "^4.1.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "proxy": "http://localhost:5050",
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ]
}
```
21. In your client folder open up your src folder and delete App.* files
22. Create a folder called components with file Todo.js
23. Modify index.js as follows

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Todo from './components/Todo';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Todo />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
```





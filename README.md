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
21. In your client folder open up your src folder
22. Create a folder called components with file Todo.js

## Setting up Redux

23. In your client/ npm i redux react-redux redux-saga styled-components axios
24. In your client/src folder create a folder called components
25. Create a file called Home.js 
25. In your App.js 

```
import React, { Component } from 'react';
import Home from './components/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <Home />
    );
  }
}

export default App;
```
### Create Store

In your src folder create three folders reducers, actions and sagas
In reducers create 2 files index.js and TodoReducer.js

#### TodoReducer.js
```
const initialState = {

}

export default function(state = initialState, action) {
    switch(action.type){
        default:
        break;
    }
    retutrn initialState;
}
```
#### index.js
```
import {combineReducers} from 'redux'
import TodoReducer from './TodoReducer'


export const rootReducer = combineReducers({
    todos: TodoReducer
})
```
In src/saga folder create index.js file 
```
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

function* mySaga() {
}

export default mySaga;
```

Update your App.js file as follows
```
import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import Home from './components/Home';
import rootReducer from './reducers'
import './App.css';
import createSagaMiddleware from 'redux-saga'
import mySaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, {}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

class App extends Component {
  render() {
    return (
     <Provider store={store}>
      <Home />
      </Provider>  
    );
  }
}

export default App;
```

## Building the UI

In the src/components make 4 more files Home.js , TodoItem.js, ListTodos.js , AddTodos.js

### Home.js

```
import React, { Component } from 'react';
import styled from 'styled-components';
import AddTodos from './AddTodos'
import ListTodos from './ListTodos'


const MainWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #000;
    flex-direction: column;
    align-items: center;
  `

const StyledHeading = styled.h1`
  color: #fff;
`  

export default class Home extends Component {
  render() {
    return (
      <MainWrapper>
        <StyledHeading>My Todo App</StyledHeading>
        <AddTodos />
        <ListTodos />
      </MainWrapper>
    )
  }
}
```

### Addtodos.js
```
import React, { Component } from 'react'
import styled from 'styled-components'

const OuterWrapper = styled.div`
    width: 100%;
    display:flex;
    justify-content: center;
`;

const StyledInput = styled.input`
    width: 70%;
    padding: 20px;
    border: 1px solid black;
    border-radius: 10px;
`;

const StyledButton = styled.button`
    width: 10%;
    color: white;
    background-color: #5b73a7;
    border: none;
    border-radius: 10px;
    margin-left: 10px;
`


export default class AddTodos extends Component {
  render() {
    return (
     <OuterWrapper>
        <StyledInput />
        <StyledButton>Add</StyledButton>
      </OuterWrapper>   
    )
  }
}
```

### TodoItem.js
```
import React, { Component } from 'react'
import styled from 'styled-components'

const ItemWrapper = styled.div`
    width:80%;
    background-color: #3d6fe9;
    border-radius: 10px;
    padding: 10px;
    margin-top: 20px;
    display:flex;
    flex-direction:row;
`

const StyledCheckbox = styled.input`
    margin: 10px;
`

const StyledText = styled.p`
    margin: 8px;
    color: #fff;
    width:90%;
`

const StyledButton = styled.button`
    width: 10%;
    color: white;
    background-color: #5b73a7;
    border: 1px solid white;
    border-radius: 10px;
    margin-left: 10px;
`

export default class TodoItem extends Component {
  render() {
    let {text} = this.props;  
    return (
      <ItemWrapper>
          <StyledCheckbox type="checkbox" />
          <StyledText>{text}</StyledText>
          <StyledButton>Delete</StyledButton>
      </ItemWrapper>
    )
  }
}
```
### ListTodos.js
```
import React, { Component } from 'react'
import TodoItem from './TodoItem'

const actions = [
    {'_id':1,'action':'Action 1'},
    {'_id':2,'action':'Action 2'}
]

export default class ListTodos extends Component {
  render() {
    return actions.map(act => <TodoItem key={act._id} text={act.action} />);
  }
}
```
## Fetching Data from Api

In your constants.js file
```
export const FETCH_ACTIONS = 'FETCH_ACTIONS';
export const FETCH_ACTIONS_SUCCESS = 'FETCH_ACTIONS_SUCCESS';
export const FETCH_ACTIONS_FAILURE = 'FETCH_ACTIONS_FAILURE';
```

In your actions/index.js
```
import {FETCH_ACTIONS} from './constants'

export default function fetch_actions(){
    return {
        type: FETCH_ACTIONS,
    }
}
```
In your saga/index.js
```
import { call, put, takeLatest } from 'redux-saga/effects'
import {FETCH_ACTIONS,FETCH_ACTIONS_SUCCESS,FETCH_ACTIONS_FAILURE} from '../actions/constants'
import axios from 'axios'

function fetchActionsFromApi(){
    return axios.get('/api/todos');
            
}

function* fetchActions(){
    
    try {
        const response = yield call(fetchActionsFromApi)

        yield put({'type':FETCH_ACTIONS_SUCCESS,'payload':response.data})
    } catch(e){
        
        yield put({'type': FETCH_ACTIONS_FAILURE})
    }
}

function* mySaga() {
    yield takeLatest(FETCH_ACTIONS,fetchActions);
}

export default mySaga;
```
In TodoReducer.js

```
import {FETCH_ACTIONS_SUCCESS, FETCH_ACTIONS_FAILURE} from '../actions/constants'

const initialState = {
    actions: []
}

export default function(state = initialState, action) {
    switch(action.type){

        case FETCH_ACTIONS_SUCCESS:
            console.log('REduceer',{...state,actions: action.payload})
            return {...state,actions: action.payload}
        
        case FETCH_ACTIONS_FAILURE:
            return state;    

        default:
        return state;
        
    }
}
```
In ListTodo.js

```
import React, { Component } from 'react'
import TodoItem from './TodoItem'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import fetch_actions from '../actions';

class ListTodos extends Component {
  componentDidMount(){
      this.props.fetchActions();
  }  
  render() {
      let {actions} = this.props.todos;
    return actions.map(act => <TodoItem key={act._id} text={act.action} />);
  }
}

const mapStateToProps  = state => ({
    todos: state.todos
});

const mapDispatchToProps  = dispatch => {
    return bindActionCreators({fetchActions: fetch_actions},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(ListTodos);
```
## Adding data to Database using Api

### constants.js
```
export const FETCH_ACTIONS = 'FETCH_ACTIONS';
export const FETCH_ACTIONS_SUCCESS = 'FETCH_ACTIONS_SUCCESS';
export const FETCH_ACTIONS_FAILURE = 'FETCH_ACTIONS_FAILURE';
export const ADD_ACTION_REQUEST = 'ADD_ACTION_REQUEST';
export const ADD_ACTION = 'ADD_ACTION';
```
### actions/index.js
```
import {FETCH_ACTIONS, ADD_ACTION_REQUEST} from './constants'

export const fetch_actions = () =>{
    return {
        type: FETCH_ACTIONS,
    }
}

export const add_action = (text) => {
    return {
        type: ADD_ACTION_REQUEST,
        payload: text
    }
}
```

### AddTodo.js
```
import React, { Component } from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {add_action} from '../actions'
const OuterWrapper = styled.div`
    width: 100%;
    display:flex;
    justify-content: center;
`;

const StyledInput = styled.input`
    width: 70%;
    padding: 20px;
    border: 1px solid black;
    border-radius: 10px;
`;

const StyledButton = styled.button`
    width: 10%;
    color: white;
    background-color: #5b73a7;
    border: none;
    border-radius: 10px;
    margin-left: 10px;
`


class AddTodos extends Component {

    state = {
        text: ''
    }

   handleChange = (e) =>{
       this.setState({
           text: e.target.value
       })
   } 

   onAddClicked = () => {
        console.log('Add', this.state.text)
        //Dispatch Action
        this.props.add_action(this.state.text);
   }

  render() {
    return (
     <OuterWrapper>
        <StyledInput onChange={this.handleChange} />
        <StyledButton onClick={this.onAddClicked} >Add</StyledButton>
      </OuterWrapper>   
    )
  }
}

const mapDispatchToProps =  dispatch => ({
    add_action: (text) => dispatch(add_action(text))
})

export default connect(null,mapDispatchToProps)(AddTodos)
```

### sagas/index.js
```
import { call, put, takeLatest } from 'redux-saga/effects'
import {FETCH_ACTIONS,FETCH_ACTIONS_SUCCESS,FETCH_ACTIONS_FAILURE,ADD_ACTION, ADD_ACTION_REQUEST} from '../actions/constants'
import axios from 'axios'

function fetchActionsFromApi(){
    return axios.get('/api/todos');           
}

function addActionToDatabase(text){
    return axios.post('/api/todos',{'action':text})
}

function* fetchActions(){
    
    try {
        const response = yield call(fetchActionsFromApi)

        yield put({'type':FETCH_ACTIONS_SUCCESS,'payload':response.data})
    } catch(e){
        
        yield put({'type': FETCH_ACTIONS_FAILURE})
    }
}

function* addAction(action){

    try{
        const response = yield call(addActionToDatabase,action.payload);
        yield put({type: ADD_ACTION,payload: response.data})
    } catch(e){
        yield put({'type':FETCH_ACTIONS_FAILURE})
    }

}

function* mySaga() {
    yield takeLatest(FETCH_ACTIONS,fetchActions);
    yield takeLatest(ADD_ACTION_REQUEST,addAction)
}

export default mySaga;
```

### TodoReducer.js
```
import {FETCH_ACTIONS_SUCCESS, FETCH_ACTIONS_FAILURE,ADD_ACTION} from '../actions/constants'

const initialState = {
    actions: []
}

export default function(state = initialState, action) {
    switch(action.type){

        case FETCH_ACTIONS_SUCCESS:
            console.log('REduceer',{...state,actions: action.payload})
            return {...state,actions: action.payload}
        
        case FETCH_ACTIONS_FAILURE:
            return state;    

        case ADD_ACTION:
            console.log('Add action',{...state,actions: [...state.actions,action.payload]})
            return {...state,actions: [...state.actions,action.payload]}

        default:
        return state;
        
    }
}
```
## Delete Action from Database using Api
### constants.js
```
export const FETCH_ACTIONS = 'FETCH_ACTIONS';
export const FETCH_ACTIONS_SUCCESS = 'FETCH_ACTIONS_SUCCESS';
export const FETCH_ACTIONS_FAILURE = 'FETCH_ACTIONS_FAILURE';
export const ADD_ACTION_REQUEST = 'ADD_ACTION_REQUEST';
export const ADD_ACTION = 'ADD_ACTION';
export const DELETE_ACTION_REQUEST = 'DELETE_ACTION_REQUEST';
export const DELETE_ACTION = 'DELETE_ACTION';
```
### actions/index.js
```
import {FETCH_ACTIONS, ADD_ACTION_REQUEST, DELETE_ACTION_REQUEST} from './constants'

export const fetch_actions = () =>{
    return {
        type: FETCH_ACTIONS,
    }
}

export const add_action = (text) => {
    return {
        type: ADD_ACTION_REQUEST,
        payload: text
    }
}

export const delete_action = (id) => {
    console.log('Delete action with id',id);
    return {
        type: DELETE_ACTION_REQUEST,
        payload: id
    }
}
```
### TodoItem.js
```
import React, { Component } from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {delete_action} from '../actions'

const ItemWrapper = styled.div`
    width:80%;
    background-color: #3d6fe9;
    border-radius: 10px;
    padding: 10px;
    margin-top: 20px;
    display:flex;
    flex-direction:row;
`

const StyledCheckbox = styled.input`
    margin: 10px;
`

const StyledText = styled.p`
    margin: 8px;
    color: #fff;
    width:90%;
`

const StyledButton = styled.button`
    width: 10%;
    color: white;
    background-color: #5b73a7;
    border: 1px solid white;
    border-radius: 10px;
    margin-left: 10px;
`

class TodoItem extends Component {

  render() {
    let {text,id} = this.props;  
    return (
      <ItemWrapper>
          <StyledCheckbox type="checkbox" />
          <StyledText>{text}</StyledText>
          <StyledButton onClick={() => this.props.delete_action(id)}>Delete</StyledButton>
      </ItemWrapper>
    )
  }
}

const mapDispatchToProps = dispatch => ({
    delete_action: (id) => dispatch(delete_action(id))
})


export default connect(null,mapDispatchToProps)(TodoItem);
```
### sagas/index.js
```
import { call, put, takeLatest } from 'redux-saga/effects'
import {FETCH_ACTIONS,FETCH_ACTIONS_SUCCESS,FETCH_ACTIONS_FAILURE,ADD_ACTION,DELETE_ACTION_REQUEST,DELETE_ACTION,ADD_ACTION_REQUEST} from '../actions/constants'
import axios from 'axios'

function fetchActionsFromApi(){
    return axios.get('/api/todos');           
}

function addActionToDatabase(text){
    return axios.post('/api/todos',{'action':text})
}

function deleteActionFromDatabase(id){
    return axios.delete(`/api/todos/${id}`)
}

function* fetchActions(){
    
    try {
        const response = yield call(fetchActionsFromApi)

        yield put({'type':FETCH_ACTIONS_SUCCESS,'payload':response.data})
    } catch(e){
        
        yield put({'type': FETCH_ACTIONS_FAILURE})
    }
}

function* addAction(action){

    try{
        const response = yield call(addActionToDatabase,action.payload);
        yield put({type: ADD_ACTION,payload: response.data})
    } catch(e){
        yield put({'type':FETCH_ACTIONS_FAILURE})
    }

}

function* deleteAction(action){

    try{
        const response = yield call(deleteActionFromDatabase,action.payload);
        yield put({type: DELETE_ACTION,payload: response.data})
    } catch(e){
        yield put({'type':FETCH_ACTIONS_FAILURE})
    }

}

function* mySaga() {
    yield takeLatest(FETCH_ACTIONS,fetchActions);
    yield takeLatest(ADD_ACTION_REQUEST,addAction)
    yield takeLatest(DELETE_ACTION_REQUEST,deleteAction)
}

export default mySaga;
```
### TodoReducer.js
```
import {FETCH_ACTIONS_SUCCESS, FETCH_ACTIONS_FAILURE,ADD_ACTION, DELETE_ACTION} from '../actions/constants'

const initialState = {
    actions: []
}

export default function(state = initialState, action) {
    switch(action.type){

        case FETCH_ACTIONS_SUCCESS:
            console.log('REduceer',{...state,actions: action.payload})
            return {...state,actions: action.payload}
        
        case FETCH_ACTIONS_FAILURE:
            return state;    

        case ADD_ACTION:
            console.log('Add action',{...state,actions: [...state.actions,action.payload]})
            return {...state,actions: [...state.actions,action.payload]}

        case DELETE_ACTION:
             console.log('DELETE action',{...state,actions: state.actions.filter(act => act._id !== action.payload)})
            return {...state,actions: state.actions.filter(act => act._id !== action.payload._id)}

        default:
        return state;
        
    }
}
```

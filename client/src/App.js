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

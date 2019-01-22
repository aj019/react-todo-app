import {combineReducers} from 'redux'
import TodoReducer from './TodoReducer'


const rootReducer = combineReducers({
    todos: TodoReducer
})

export default rootReducer;
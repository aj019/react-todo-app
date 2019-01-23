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
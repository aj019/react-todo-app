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
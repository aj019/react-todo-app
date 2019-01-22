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
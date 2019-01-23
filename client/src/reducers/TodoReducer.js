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
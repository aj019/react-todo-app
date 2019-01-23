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
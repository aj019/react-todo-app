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
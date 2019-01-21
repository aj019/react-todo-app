import React, {Component} from 'react';

const actions = [
    {"id": "1", "action":"Here is my action tex1"},
    {"id": "2", "action":"Here is my action tex"},
    {"id": "3", "action":"Here is my action tex"},
    {"id": "4", "action":"Here is my action tex"}
]

class ListTodos extends Component{
    render(){
        return actions.map(action => {
           return <h1 key={action.id}>{action.action}</h1>
        })
    }
}

export default ListTodos;
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

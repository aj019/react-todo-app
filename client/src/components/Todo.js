import React, { Component } from 'react';
import styled from 'styled-components';

import ListTodos from './ListTodos'


const MainWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow:hidden;
    background-color: black;
    color: white;
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Header = styled.h1`
    margin:20px;
    padding: 20px;
    text-align : center;
`
const InputBox = styled.input`
    width: 80%;
    height: 37px;
    padding: 10px;
    font-size: 20px;
    border: 1px solid black;
    border-radius: 10px;
`

class TodoList extends Component {
    render(){
        return (
        <MainWrapper>
            <Header>My Todo List App</Header>
            <InputBox placeholder="Enter Your Action" />
            <ListTodos />    
        </MainWrapper>)
    }
}

export default TodoList;
import React, { Component } from 'react';
import styled from 'styled-components';
import AddTodos from './AddTodos'
import ListTodos from './ListTodos'


const MainWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #000;
    flex-direction: column;
    align-items: center;
  `

const StyledHeading = styled.h1`
  color: #fff;
`  

export default class Home extends Component {
  render() {
    return (
      <MainWrapper>
        <StyledHeading>My Todo App</StyledHeading>
        <AddTodos />
        <ListTodos />
      </MainWrapper>
    )
  }
}

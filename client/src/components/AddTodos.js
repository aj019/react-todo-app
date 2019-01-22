import React, { Component } from 'react'
import styled from 'styled-components'

const OuterWrapper = styled.div`
    width: 100%;
    display:flex;
    justify-content: center;
`;

const StyledInput = styled.input`
    width: 70%;
    padding: 20px;
    border: 1px solid black;
    border-radius: 10px;
`;

const StyledButton = styled.button`
    width: 10%;
    color: white;
    background-color: #5b73a7;
    border: none;
    border-radius: 10px;
    margin-left: 10px;
`


export default class AddTodos extends Component {
  render() {
    return (
     <OuterWrapper>
        <StyledInput />
        <StyledButton>Add</StyledButton>
      </OuterWrapper>   
    )
  }
}

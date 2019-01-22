import React, { Component } from 'react'
import styled from 'styled-components'

const ItemWrapper = styled.div`
    width:80%;
    background-color: #3d6fe9;
    border-radius: 10px;
    padding: 10px;
    margin-top: 20px;
    display:flex;
    flex-direction:row;
`

const StyledCheckbox = styled.input`
    margin: 10px;
`

const StyledText = styled.p`
    margin: 8px;
    color: #fff;
    width:90%;
`

const StyledButton = styled.button`
    width: 10%;
    color: white;
    background-color: #5b73a7;
    border: 1px solid white;
    border-radius: 10px;
    margin-left: 10px;
`

export default class TodoItem extends Component {
  render() {
    let {text} = this.props;  
    return (
      <ItemWrapper>
          <StyledCheckbox type="checkbox" />
          <StyledText>{text}</StyledText>
          <StyledButton>Delete</StyledButton>
      </ItemWrapper>
    )
  }
}

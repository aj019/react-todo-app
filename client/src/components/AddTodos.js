import React, { Component } from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {add_action} from '../actions'
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


class AddTodos extends Component {

    state = {
        text: ''
    }

   handleChange = (e) =>{
       this.setState({
           text: e.target.value
       })
   } 

   onAddClicked = () => {
        console.log('Add', this.state.text)
        //Dispatch Action
        this.props.add_action(this.state.text);
   }

  render() {
    return (
     <OuterWrapper>
        <StyledInput onChange={this.handleChange} />
        <StyledButton onClick={this.onAddClicked} >Add</StyledButton>
      </OuterWrapper>   
    )
  }
}

const mapDispatchToProps =  dispatch => ({
    add_action: (text) => dispatch(add_action(text))
})

export default connect(null,mapDispatchToProps)(AddTodos)
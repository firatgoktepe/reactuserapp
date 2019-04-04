import React, { Component } from 'react'
import axios from "axios";
const UserContext = React.createContext();
// Gives us Provider, Consumer 
//this.props.children represents our App component(children of our UserProvider),it is sent automatically by React.
const reducer = (state,action) => {
    switch(action.type) {
        case "DELETE_USER":
          return {
            ...state,
            users: state.users.filter(user => action.payload !== user.id)
          }

        case "ADD_USER":
           return {
             ...state,
             users: [...state.users,action.payload]
           }
        case "UPDATE_USER":
           return {
             ...state,
             users : state.users.map(user => user.id === action.payload.id ? action.payload : user)  
           } 

        default:
           return state
    }
}
  
export class UserProvider extends Component {
    state = {
        users : [],
         dispatch : action => {
             this.setState(state => reducer(state,action))
         }
      }
  componentDidMount = async () => {
    const response = await axios.get("http://localhost:3004/users")
    this.setState({
      users : response.data
    })
  }
     
  render() {
    return (
      <UserContext.Provider value = {this.state}>
        {this.props.children} 
      </UserContext.Provider>
    )
  }
}
const UserConsumer = UserContext.Consumer;
//Create our consumer. We have to create consumer to use value of UserContext.Provider
export default UserConsumer;
//export it to use for all components 
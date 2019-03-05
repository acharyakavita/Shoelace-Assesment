import React, { Component } from "react";
import "./App.css";
import Users from "../src/Components/Users/Users";
import Layout from "../src/Containers/Layout/Layout";
import AddUser from "../src/Components/AddUser/AddUser";
import { Route } from "react-router-dom";
import PropTypes from 'prop-types';

class App extends Component {
  state = {
    users: [
      {
        id: 1,
        name: "Dave J",
        template: "Single Image Ad",
        startDate: "2018-01-01",
        repeat: "Daily",
        isActive: true
      }
    ],
    formIsValid:false,
    inputConfig:{}
  }

  get initialState() {
    return {
        name:{
          label: "Name",
          placeholder: "Enter Your Name",
          elementType: "input",
          inputType: "text",
          value: "",
          required: true,
          touched: false,
          valid:false
        },
        template:{
          label: "Select Template",
          elementType: "select",
          options: [
            { value: "Single Image Ad", displayValue: "Single Image Ad" },
            { value: "Carousal Ad", displayValue: "Carousal Ad" }
          ],
          value: "Single Image Ad",
          required: true,
          valid: true,
          touched: false
        },
        startDate:{
          label: "Start Date",
          elementType: "input",
          inputType: "date",
          value: "",
          required: true,
          valid: false,
          touched: false
        },
        repeat:{
          label: "Repeat",
          elementType: "select",
          options: [
            { value: "Daily", displayValue: "Daily" },
            { value: "Weekly", displayValue: "Weekly" },
            { value: "Monthly", displayValue: "Monthly" }
          ],
          value: "Daily",
          required: true,
          valid: true,
          touched: false
        },
        isActive:{
          label: "Is User Active?",
          elementType: "select",
          options: [
            { value: true, displayValue: "Yes" },
            { value: false, displayValue: "No" },
          ],
          value: true,
          required: true,
          valid: true,
          touched: false
        }
    };
  }

  componentWillMount(){
    let config=this.initialState
    this.setState({inputConfig:config})
    
  }

  static contextTypes = {
    router: PropTypes.object,
  }
  
  changeInputValuesHandler=(event,id)=>{
    let newValue=event.target.value
    let newConfig={...this.state.inputConfig}
    newConfig[id].value=newValue
    newConfig[id].touched=true
    if(newConfig[id].valid===false){
      newConfig[id].valid=this.checkValidity(newConfig[id].value,newConfig[id].required)
    }
    
    let formIsValid=true;
    formIsValid=newConfig[id].valid  && formIsValid
    this.setState({inputConfig:newConfig,formIsValid:formIsValid})
  }

 
  newMethod() {
    return this;
  }

  checkValidity(value,rules){
    let isValid=true;
    if(rules.required){
        isValid=value.trim()!=='' && isValid;
    }
    return isValid;
}

  addNewUserHandler=(event)=>{
    event.preventDefault();
    let newUser={}
    newUser.id=new Date().getTime();
    let newConfig={...this.state.inputConfig}
    for(let element in newConfig ){
      newUser[element]=newConfig[element].value
    }
    if(newUser.startDate===''){
      newUser.startDate=new Date().toISOString().slice(0,10);
    }

    let combinedUsers=[...this.state.users]
    combinedUsers.push(newUser)
    this.setState({users:combinedUsers},()=>{
      this.redirect()
    })
  }

  redirect(){
    let config=this.initialState
    this.setState({inputConfig:config})
    this.context.router.history.push('/')
  }
  
  render() {
    return (
      <div className="App">
        <Layout>
          <Route
            path="/"
            exact
            render={props => <Users {...props} data={this.state.users} />}
          />
          <Route
            path="/addNew"
            exact
            render={props => (
              <AddUser
                {...props}
                data={this.state.users}
                config={this.state.inputConfig}
                addNewUSer={this.addNewUserHandler}
                changeInputValues={this.changeInputValuesHandler}
              />
            )}
          />
          {/*<Route path="/:id" component={EditUser}/>*/}
        </Layout>
      </div>
    );
  }
}

export default App;

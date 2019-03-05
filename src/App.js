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
    inputConfig: {
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
    }
  };

  changeInputValuesHandler=(event,id)=>{
    let newValue=event.target.value
    let newConfig={...this.state.inputConfig}
    for (let element in newConfig){
      if(element===id){
        newConfig[id].value=newValue
      }
    }
    this.setState({inputConfig:newConfig})
  }

  static contextTypes = {
    router: PropTypes.object,
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

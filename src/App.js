import React, { Component } from "react";
import "./App.css";
import Users from "../src/Components/Users/Users";
import Layout from "../src/Containers/Layout/Layout";
import AddUser from "../src/Components/AddUser/AddUser";
import { Route } from "react-router-dom";

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

  addNewUserHandler=(event)=>{
    event.preventDefault();
    let newUser={}
    newUser.id=new Date().getTime();
    /*newUser.name=this.state.inputConfig[0].value;
    template: "Single Image Ad",
    startDate: "2018-01-01",
    repeat: "Daily",
    isActive: true*/
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

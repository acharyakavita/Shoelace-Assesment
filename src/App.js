import React, { Component } from "react";
import "./App.css";
import Users from "../src/Components/Users/Users";
import Layout from "../src/Containers/Layout/Layout";
import AddUser from "../src/Components/AddUser/AddUser";
import EditUser from "../src/Components/EditUser/EditUser";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

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
    formIsValid: false,
    inputConfig: {},
    user: {},
    updateFlag:false
  };

  get initialState() {
    return {
      name: {
        label: "Name",
        placeholder: "Enter Your Name",
        elementType: "input",
        inputType: "text",
        value: "",
        required: true,
        valid: false,
        touched: false
      },
      template: {
        label: "Select Template",
        elementType: "select",
        options: [
          { value: "Single Image Ad", displayValue: "Single Image Ad" },
          { value: "Carousal Ad", displayValue: "Carousal Ad" }
        ],
        value: "Single Image Ad",
        required: false,
        valid: true,
        touched: false
      },
      startDate: {
        label: "Start Date",
        elementType: "input",
        inputType: "date",
        value: "",
        required: true,
        valid: false,
        touched: false
      },
      repeat: {
        label: "Repeat",
        elementType: "select",
        options: [
          { value: "Daily", displayValue: "Daily" },
          { value: "Weekly", displayValue: "Weekly" },
          { value: "Monthly", displayValue: "Monthly" }
        ],
        value: "Daily",
        required: false,
        valid: true,
        touched: false
      },
      isActive: {
        label: "Is User Active?",
        elementType: "select",
        options: [
          { value: true, displayValue: "Yes" },
          { value: false, displayValue: "No" }
        ],
        value: true,
        required: true,
        valid: true,
        touched: false
      }
    };
  }

  componentWillMount() {
    let config = this.initialState;
    this.setState({ inputConfig: config });
  }

  static contextTypes = {
    router: PropTypes.object
  };

  changeInputValuesHandler = (event, id) => {
    let newValue = event.target.value;
    let newConfig = { ...this.state.inputConfig };
    newConfig[id].value = newValue;
    newConfig[id].touched = true;
    if (newConfig[id].valid === false) {
        newConfig[id].valid = this.checkValidity(
        newConfig[id].value,
        newConfig[id].required
      );
    }

    let formIsValid = true;
    formIsValid = newConfig[id].valid && formIsValid;
    this.setState({ inputConfig: newConfig, formIsValid: formIsValid });
  };

  checkValidity(value, required) {
    let isValid = true;
    if (required) {
      isValid = value.trim() !== "" && isValid;
    }
    return isValid;
  }

  getTodaysDate(){
    let date=new Date()
      let month=Number(date.getMonth()+1)
      if(month<10 ){
        month='0'+month
      }
      let day=date.getDate()
      if(day<10 ){
        day='0'+date.getDate()
      }
      return date.getFullYear() + "-" + month + "-"  + day
  }
  addNewUserHandler = event => {
    event.preventDefault();
    let newUser = {};
    newUser.id = new Date().getTime();
    let newConfig = { ...this.state.inputConfig };
    for (let element in newConfig) {
      newUser[element] = newConfig[element].value;
    }
    if (newUser.startDate === "") {
      
      newUser.startDate=this.getTodaysDate()
    }

    let combinedUsers = [...this.state.users];
    combinedUsers.push(newUser);
    this.setState({ users: combinedUsers }, () => {
      let path = "/";
      let config = this.initialState;
      this.setState({ inputConfig: config, formIsValid: false });
      this.redirect(path);
    });
  };

  redirect(path) {
    this.context.router.history.push(path);
  }

  editUserHandler = (event, id) => {
    event.preventDefault();
    //find user
    let selectedUser = [];
    this.state.users.forEach(user => {
      if (user.id === id) {
        selectedUser.push(user);
      }
    });
    let selectedUserObj = Object.assign({}, selectedUser[0]);

    //set user data in config
    let config = { ...this.state.inputConfig };
    for (let element in config) {
      if (selectedUserObj[element]) {
        config[element].value = selectedUserObj[element];
      }
    }
    this.setState({ inputConfig: config, user: selectedUserObj,updateFlag:true });
    let path = "/:" + id;
    this.redirect(path);
  };

  modifyUserDataHandler = event => {
    event.preventDefault();
    let editedUser = { ...this.state.user };
    let updatedUsers = [...this.state.users];
    let updatedConfig = { ...this.state.inputConfig };

    for (let element of updatedUsers) {
      if (element.id === editedUser.id) {
        element.name = updatedConfig.name.value;
        element.template = updatedConfig.template.value;
        element.repeat = updatedConfig.repeat.value;
        element.isActive = updatedConfig.isActive.value;
        element.startDate = updatedConfig.startDate.value;
      }
    }

    this.setState({ users: updatedUsers }, () => {
      let config = this.initialState;
      this.setState({ inputConfig: config ,updateFlag:false});
        this.redirect('/');
    });
  };

  backButtonHandler=(event)=>{
    event.preventDefault()
    let config = this.initialState;
    this.setState({ inputConfig: config ,updateFlag:false});
      this.redirect('/');
  }

  render() {
    let editRoute=null;
    if(this.state.updateFlag){
      editRoute=<Route
      path="/:id"
      render={props => (
        <EditUser
          {...props}
          data={this.state.users}
          config={this.state.inputConfig}
          modifyUser={this.modifyUserDataHandler}
          changeInputValues={this.changeInputValuesHandler}
          disabled={!this.state.formIsValid}
          back={this.backButtonHandler}
        />
      )}
    />
    }
    return (
      <div className="App">
        <Layout>
          <Route
            path="/"
            exact
            render={props => (
              <Users
                {...props}
                data={this.state.users}
                editUser={this.editUserHandler}
              />
            )}
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
                disabled={!this.state.formIsValid}
                back={this.backButtonHandler}
              />
            )}
          />
          {editRoute}    
        </Layout>
      </div>
    );
  }
}

export default App;

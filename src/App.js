import React, { Component } from "react";
import "./App.css";
import Users from "../src/Components/Users/Users";
import Layout from "../src/Containers/Layout/Layout";
import AddUser from "../src/Components/AddUser/AddUser";
import EditUser from "../src/Components/EditUser/EditUser";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

class App extends Component {
  //initial state
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
    updateFlag: false
  };


  //Form input fields configuration settings
  //I have written inside initialState() method so as to reset the form to its initial values ,after update/new User add 
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

  //set initial config items
  componentWillMount() {
    let config = this.initialState;
    this.setState({ inputConfig: config });
  }

  //set context type 
  static contextTypes = {
    router: PropTypes.object
  };

  //Input values change handler
  //Here I have set event.target.value to corresponding input config object key after doing some validations on blank input
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

  //input validation method
  checkValidity(value, required) {
    let isValid = true;
    if (required) {
      isValid = value.trim() !== "" && isValid;
    }
    return isValid;
  }

  //return today's date
  getTodaysDate() {
    let date = new Date();
    let month = Number(date.getMonth() + 1);
    if (month < 10) {
      month = "0" + month;
    }
    let day = date.getDate();
    if (day < 10) {
      day = "0" + date.getDate();
    }
    return date.getFullYear() + "-" + month + "-" + day;
  }

  //Add's new user object to the existing users object
  //Post addition,page is redirected to User's page
  addNewUserHandler = event => {

    event.preventDefault();
    let newUser = {};
    newUser.id = new Date().getTime();
    let newConfig = { ...this.state.inputConfig };
    for (let element in newConfig) {
      newUser[element] = newConfig[element].value;
    }
    if (newUser.startDate === "") {
      newUser.startDate = this.getTodaysDate();
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


  //redirect method
  redirect(path) {
    this.context.router.history.push(path);
  }

  //This method is called when user clicks on the modify button from User's page.
  //Data of that user is retrieved using id and page is redirected to prefilled user edit page
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
    this.setState({
      inputConfig: config,
      user: selectedUserObj,
      updateFlag: true
    });
    let path = "/:" + id;
    this.redirect(path);
  };

  //Modified data will be updated in the main users object and page will be redirected to User's page
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
      this.setState({ inputConfig: config, updateFlag: false });
      this.redirect("/");
    });
  };

  //Always redirects to user page if we dont want to update/add new user
  backButtonHandler = event => {
    event.preventDefault();
    let config = this.initialState;
    this.setState({ inputConfig: config, updateFlag: false });
    this.redirect("/");
  };

  //render method
  render() {
  
//Edit page is shown only if User modify is requested
    let editRoute = null;
    if (this.state.updateFlag) {
      editRoute = (
        <Route
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
      );
    }
    //Routes for home and Add New User page
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

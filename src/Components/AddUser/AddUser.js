import React from "react";
import Form from "../Form/Form";
import Classes from "./AddUser.css";

const addUser= props => {
    let buttonData='Add User'
  return <div className={Classes.AddUser}>
  <Form config={props.config} 
  changeInputValues={props.changeInputValues} 
  handleUser={props.addNewUSer} 
  button={buttonData}
  disabled={props.disabled}
  back={props.back}
  />
  </div>;
};

export default addUser;

import React from "react";
import Form from "../Form/Form";
import Classes from "./AddUser.css";

const addUser= props => {
  return <div className={Classes.AddUser}>
  <Form config={props.config} changeInputValues={props.changeInputValues} addNewUSer={props.addNewUSer}/>
  </div>;
};

export default addUser;

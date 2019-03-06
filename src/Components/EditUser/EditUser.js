import React from "react";
import Form from "../Form/Form";
import Classes from "./EditUser.css";

const editUser= props => {
  let buttonData='Modify User'
  return <div className={Classes.EditUser}>
  <Form config={props.config} changeInputValues={props.changeInputValues} handleUser={props.modifyUser} button={buttonData}/>
  </div>;
};

export default editUser;

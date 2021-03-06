import React from "react";
import Form from "../Form/Form";
import Classes from "./EditUser.css";

//modify user form rendering
const editUser = props => {
  let buttonData = "Modify User";
  return (
    <div className={Classes.EditUser}>
      <Form
        config={props.config}
        changeInputValues={props.changeInputValues}
        handleUser={props.modifyUser}
        button={buttonData}
        disabled={props.disabled}
        back={props.back}
      />
    </div>
  );
};

export default editUser;

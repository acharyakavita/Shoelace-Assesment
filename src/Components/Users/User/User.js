import React from "react";
import Button from '../../Button/Button';
import Classes from "./User.css";

const user = props => {
    let active=''
    if(props.data.isActive===true){
        active='Yes'
    }
    else {
        active='No'
    }
  return (
      <div className={Classes.User}>
        <p>Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;{props.data.name}</p>
        <p>Template&nbsp; : &nbsp;{props.data.template}</p>
        <p>Start Date : &nbsp;{props.data.startDate}</p>
        <p>Repeat &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;{props.data.repeat}</p>
        <p>Active &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;{active}</p>
        <hr/>
        <div className={Classes.Button}>
        <Button click={props.editUser}>Modify User</Button>
        </div>
      </div>

  );
};

export default user;

import React from "react";
import User from "./User/User";
import Classes from "./Users.css";

const users = props => {
  //User list rending
  let userData = null;
  if (props.data.length > 0) {
    userData = props.data.map(user => {
      return (
        <User
          key={user.id}
          data={user}
          editUser={event => props.editUser(event, user.id)}
        />
      );
    });
  }

  return <div className={Classes.Users}>{userData}</div>;
};

export default users;

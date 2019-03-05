import React from "react";
import User from './User/User';
import Classes from './Users.css';

const users =(props)=>{
    let userData=null;
    if(props.data.length>0){
        userData=props.data.map(user=>{
            return(
                <User key={user.id}data={user}/>)
        })
    }
    
    return (
      <div className={Classes.Users}>
        {userData}
      </div>
    );
  }


export default users;

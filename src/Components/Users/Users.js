import React, { Component } from "react";
import Button from "../../Components/Button/Button.js";
class App extends Component {
  state = {
    users: [
      {
        name: "Dave J",
        template: "Single Image Ad",
        startDate: "2018-01-01",
        repeat: "Daily",
        isActive: true
      }
    ]
  };


  render() {
    let userData=null;
    if(this.state.users.length>0){
        userData=this.state.users.map(user=>{
            return(
                <div>
                <p>{user.name}</p>
                </div>
            )
        })
    }
    
    return (
      <div>
        <div>
          
        </div>
        {userData}
      </div>
    );
  }
}

export default App;

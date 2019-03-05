import React from "react";
import Classes from "./Hamburger.css";

const hamburger = props => {
  return (
    <div className={Classes.Hamburger} onClick={props.clicked}>
      <div></div> 
      <div></div> 
      <div></div> 
    </div>
  );
};

export default hamburger;

import React from "react";
import Button from "../Button/Button";
import Classes from "./Form.css";
import Input from "./../Input/Input";

const form = props => {
  let formElementsArray = [];
  for (let key in props.config) {
    formElementsArray.push({
      id: key,
      config: props.config[key]
    });
  }

  let formData = formElementsArray.map(element => {
    return <Input key={element.id} config={element.config} 
    changed={event=>props.changeInputValues(event,element.id)} />;
  });

  
  return (
    <form className={Classes.Form} onSubmit={props.addNewUSer}>
      <h3>Enter User Data</h3>
      {formData}
      <div className={Classes.Button}>
        <Button click={props.addNewUSer}>{props.button}</Button>
      </div>
    </form>
  );
};

export default form;

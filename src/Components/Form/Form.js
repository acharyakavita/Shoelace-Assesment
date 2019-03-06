import React from "react";
import Button from "../Button/Button";
import Classes from "./Form.css";
import Input from "./../Input/Input";

const form = props => {
  //mapping and rendering input tags inside form
  let formElementsArray = [];
  for (let key in props.config) {
    formElementsArray.push({
      id: key,
      config: props.config[key]
    });
  }

  let formData = formElementsArray.map(element => {
    return (
      <Input
        key={element.id}
        config={element.config}
        changed={event => props.changeInputValues(event, element.id)}
        invalid={!element.config.valid}
        shouldValidate={element.config.required}
        touched={element.config.touched}
      />
    );
  });

  return (
    <form className={Classes.Form} onSubmit={props.handleUser}>
      <h3>Enter User Data</h3>
      {formData}
      <div className={Classes.Button}>
        <Button disabled={props.disabled}>{props.button}</Button>
        <Button click={props.back}>Back</Button>
      </div>
    </form>
  );
};

export default form;

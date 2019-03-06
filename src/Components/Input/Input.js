import React from "react";
import classes from "./Input.css";

const input = props => {
  //validation appropriate classes
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  //Input or select tag rendering
  switch (props.config.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          type={props.config.inputType}
          placeholder={props.config.placeholder}
          value={props.config.value}
          required={props.config.required}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.config.value}
          onChange={props.changed}
        >
          {props.config.options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.config}
          value={props.config.value}
          onChange={props.changed}
        />
      );
  }
  //validation error
  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = (
      <p className={classes.ValidationError}>
        Please enter a valid {props.config.label}
      </p>
    );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.config.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;

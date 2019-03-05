import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement]
    if (props.config.valid===false && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }
    
    switch (props.config.elementType) {
        case 'input':
            inputElement = <input className={inputClasses.join(' ')} 
            type={props.config.inputType}
            placeholder={props.config.placeholder} 
            value={props.value} 
            onChange={props.changed} />;
            break;
        case 'select':
            inputElement = (<select className={inputClasses.join(' ')} 
            value={props.config.value} 
            onChange={props.changed}>
                {props.config.options.map(option => {
                    return (<option key={option.value} value={option.value}>{option.displayValue}</option>)
                })}
            </select>);
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.config} value={props.value} onChange={props.changed}/>
    }

    let validationError = null;
    if (props.valid===false && props.touched===true) {
        validationError = <p className={classes.ValidationError}>Please enter a valid {props.config.placeholder}</p>;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.config.label}</label>
            {inputElement}
            {validationError}
        </div>
    )

}

export default input;
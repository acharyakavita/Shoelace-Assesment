
import React from 'react';
import Classes from './Button.css';

const button=(props)=>{
    return(
        <button className={Classes.Button} disabled={props.disabled} onClick={props.click}>{props.children}</button>
    )
}

export default button;
import React from 'react'
import classes from './BuildControl.css'

const buildControl = (props) =>{
    let LessDisabled = false;
    if (props.price === 20) LessDisabled = true; 
    return(
    <div className = {classes.BuildControl}>
        <div className = {classes.Label}>
            {props.label}
        </div>
        <button className = {classes.More} onClick = {props.added}>More</button>
        <button className = {classes.Less} onClick = {props.removed} disabled = {LessDisabled}>Less</button>
    </div>

)};

export default buildControl
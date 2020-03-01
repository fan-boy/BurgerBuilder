import React from 'react';

const Textbox = (props) =>(
    <input className = {props.class} type = "text" onChange = {props.changed} placeholder = {props.placeholder}/>
);

export default Textbox;
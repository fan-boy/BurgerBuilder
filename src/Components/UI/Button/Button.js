import React from 'react';
import classes from './Button.css'

const Button = (props) =>(
<button
    onClick = {props.onClick}
    className = {[classes.Button, classes[props.btnType]].join( )}>{props.Children}
</button>
);

export default Button;
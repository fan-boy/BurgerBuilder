import React from 'react';
import classes from './InputElement.css';

const InputElement = (props) =>{
    let inputElement = null;

    switch (props.inputType){
        case('input'):
            inputElement = <input {...props} className = {classes.InputType} value = {props.value} onChange = {props.changed}    />
            break;
        case('textarea'):
            inputElement = <textarea {...props} className = {classes.InputType} value = {props.value} onChange = {props.changed}/>
            break;
        case('select'):
        inputElement = <select
                className = {classes.InputType}
                 value = {props.value}
                 onChange = {props.changed}>
                     {props.elementConfig.options.map(option => (
                        <option value = {option.value}  key = {option.value}>
                            {option.displayValue}
                        </option>))}
        </select>
        break;    
        default:
            inputElement = <input {...props} className = {classes.inputType} value = {props.value} onChange = {props.changed}/>        

    }



   return(
    <div className = {classes.InputElement}>
        <label className = {classes.Label}>
            {props.label}
        </label>
        {inputElement}
    </div>
   );
};

export default InputElement;
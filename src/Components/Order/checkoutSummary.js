import React from 'react';

import Burger from '../Burger/Burger';
import buttonclasses from '../UI/Button/Button.css'
import classes from './checkoutSummary.css'


const checkoutSummary = (props) => {
    return(
        <div className = {classes.CheckoutSummary}>
            <h1>
                We Hope it tastes well!
            </h1>
            <div style = {{width:'300px', height:'300px', margin: 'auto'}}>
                <Burger ingredients = {props.ingredients}/>
            </div>
            <button className = {buttonclasses.Success} onClick = {props.ordered}>Yes</button>
            
            <button className = {buttonclasses.Danger} onClick = {props.cancelled}>No</button>
        </div>
    );
}
export default checkoutSummary;
import React from 'react';
import Auxiliary from '../../../hoc/auxiliary';
import buttonclasses from '../../UI/Button/Button.css';

const OrderSummary = (props) =>{
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igkey =>{
    return (<li key = {igkey}>{igkey} : {props.ingredients[igkey]}</li>)

    });

    return(
        <Auxiliary>
            
             <p>Your Order - </p>   
             <p>Ingredients - </p>
            <ul>
                {ingredientSummary}
            </ul>

        <p>Price : {props.totalPrice}</p>
        <p>Proceed with order ?</p>
        <button className = {buttonclasses.Success} onClick = {props.ordered}>Yes</button>
        <button className = {buttonclasses.Danger} onClick = {props.cancelled}>No</button>
        
        
        </Auxiliary>
        
    )
    

};

export default OrderSummary;
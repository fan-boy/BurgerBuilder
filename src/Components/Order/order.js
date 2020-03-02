import React from 'react';
import classes from './order.css'

const Order = (props) => {
    const ingredients = [];
    for (let i in props.ingredients){
        ingredients.push({
            name:i,
            amount: props.ingredients[i]
        });
    }
    let ingredientOutput = ingredients.map(p =>{
        return <span key={p.name} style = {{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }}>{p.name} ({p.amount}) </span>
    })
    return(
    <div className = {classes.Order}>
        <p>Ingredients : {ingredientOutput} </p>
        <p>Price :<strong>{Number.parseFloat(props.price).toFixed(2)}</strong> </p>
        <p>Email : {props.email}</p>
        
    </div>
    );

};

export default Order;
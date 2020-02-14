import React from 'react';
import BuildControl from '../BuildControls/BuildControl/BuildControl';
import classes from './BuildControl.css'
import Auxiliary from '../../../hoc/auxiliary'

const controls = [
    {label:'Salad', type: 'salad'},
    {label:'Bacon', type: 'bacon'},
    {label:'Cheese', type: 'cheese'},
    {label:'Meat', type:'meat'}
];


const buildControls = (props) =>(

    <Auxiliary>

    <div className = {classes.BuildControls}>
        {controls.map(x=>(
            <BuildControl key = {x.label}
                label = {x.label} type = {x.type}
                added = {() =>props.ingredientAdded(x.type)}
                removed = {() => props.ingredientRemoved(x.type)}/>        
         ))}
        
        <div>
        <p>Price : {props.price}</p>
        </div>
        <div>
            <button className = {classes.OrderButton} disabled = {!props.orderable} onClick = {props.purchasing}>Order Now</button>
        </div>
    </div>


    
    </Auxiliary>

);

export default buildControls;
import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(x => {
            return [...Array(props.ingredients[x])].map((_n,i) => (
                <BurgerIngredient key = {x + i} type={x}/>
            )).reduce((arr, el) =>{
                return arr.concat(el)
            },[]);
        });
        if(transformedIngredients.length ===0){
            transformedIngredients = <p>Please start adding ingredients!</p>;
        }

        return(
            <div className = {classes.Burger}>
                <BurgerIngredient type = "bread-top"/>
                {transformedIngredients}
                <BurgerIngredient type = "bread-bottom"/>
            </div>
        );
    
}
export default burger;

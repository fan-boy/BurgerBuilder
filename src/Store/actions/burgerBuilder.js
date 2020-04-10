import * as actionTypes from './actionTypes';
import axios from '../../axios-order'; 

export const addIngredient = (name) =>{
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = (name) =>{
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = (ingredients) =>{
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}
export const initIngredients = () =>{
    return dispatch  =>{
        axios.get('https://burgerbuilder-758b0.firebaseio.com/Ingredients.json')
        .then(response =>{
           dispatch(setIngredients(response.data));
        }).catch(error =>{
            dispatch(setError())
        })
    }
}
export const setError = () =>{
    return {
        actionTypes: actionTypes.SET_ERROR
    }
}
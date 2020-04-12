import * as actionTypes from  '../actions/actionTypes';

const initialState ={
    ingredients:null,
    totalPrice : 20,
    purchase:false,
    error:false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 30,
    bacon:40,
    cheese:20,
    meat:50
}

const reducer = (state = initialState, action ) =>{
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:
            let price = state.totalPrice + INGREDIENT_PRICES[action.ingredientName];
            let purchasable = false;
            if(price >20) purchasable = true;
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice : price,
                purchase:purchasable,
                building: true

            };
        case actionTypes.REMOVE_INGREDIENT:
            let priceAfterRemove = state.totalPrice - INGREDIENT_PRICES[action.ingredientName];
            let purchasableAfterRemove = false;
            if(priceAfterRemove >20) purchasableAfterRemove = true;
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: priceAfterRemove,
                purchase: purchasableAfterRemove,
                building: true    
            };
        case actionTypes.SET_INGREDIENTS:
            //let orignalIngredients = state.ingredients;
            return{
                ...state,
                ingredients:{
                    ...action.ingredients
                },
                totalPrice:20,
                building: false
            }
        case actionTypes.SET_ERROR:
            return{
                ...state,
                error: !state.error
            }        
        default:
            return state;        


    }
};

export default reducer;
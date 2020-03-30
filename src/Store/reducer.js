import * as actionTypes from  './actions';

const initialState ={
    ingredients:{
        salad:0,
        bacon:0,
        meat:0,
        cheese:0
    },
    totalPrice : 20,
    purchase:false
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
                purchase:purchasable

            };
        case actionTypes.REMOVE_INGREDIENT:
            let priceAfterRemove = state.totalPrice - INGREDIENT_PRICES[action.ingredientName];
            let purchasableAfterRemove = false;
            if(priceAfterRemove >20) purchasable = true;
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: priceAfterRemove,
                purchase: purchasableAfterRemove

            };
        default:
            return state;        


    }
};

export default reducer;
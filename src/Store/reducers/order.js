import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders:[],
    purchasing: false,
    initPurchase: false,
    fetchingOrders: false
}

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionTypes.ORDER_SUCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return{
                ...state,
                purchasing: false,
                orders:state.orders.concat(newOrder),
                initPurchase:true
            }
        case actionTypes.ORDER_FAIL:
            return{
                ...state,
                purchasing: false
            }
        case actionTypes.SET_PURCHASING:
            return{
                ...state,
                purchasing:true
            }
        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                initPurchase:false
            }          
        case actionTypes.FETCH_ORDERS_SUCCESS:
            const fetchedOrders = [];
                for (let key in action.orderData){
                    fetchedOrders.push({
                        ...action.orderData[key],
                        id:key
                    });    
                }
            return{
                ...state,
                orders: fetchedOrders,
                fetchingOrders: false

            }     
        case actionTypes.FETCH_ORDERS_FAIL:
            return{
                ...state,
                fetchingOrders: false
            }     
        case actionTypes.FETCH_ORDERS_START:
            return{
                ...state,
                fetchingOrders: true
            }    
        default:
            return state; 
    }
};

export default reducer;
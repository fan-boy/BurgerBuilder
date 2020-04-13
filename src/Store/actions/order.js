import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-order';
import auth from '../../Components/Containers/Auth/auth';

export const orderSuccess = (id,orderData) =>{
    return{
        type: actionTypes.ORDER_SUCESS,
        orderId : id,
        orderData : orderData,
        
    }
}
export const orderFail = (error) =>{
    return{
        type: actionTypes.ORDER_FAIL,
        error: error
    }
}

export const setPurchasing = () =>{
    return{
        type: actionTypes.SET_PURCHASING
    }
}
export const placeOrder = (orderData,authToken) =>{
    return dispatch =>{
        axios.post('/orders.json?auth=' + authToken,orderData).then(response =>{
            dispatch(orderSuccess(response.data.name,orderData));
        }).catch(error =>{
            dispatch(orderFail(error));
        });

    }
} 

export const purchaseInit =() =>{
    return{
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrders = (token,email) =>{
    return dispatch =>{
        axios.get('https://burgerbuilder-758b0.firebaseio.com/orders.json?auth=' + token +'orderBy=email&equalTo='+email).then(
            response =>{
                dispatch(fetchOrdersSuccess(response.data))
            }
        ).catch(
            dispatch(fetchOrdersFail())
        )
    }
}
export const fetchOrdersSuccess = (response) =>{
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orderData: response
    }
}

export const fetchOrdersFail = () =>{
    return{
        type: actionTypes.FETCH_ORDERS_FAIL
    }
}

export const fetchOrdersStart = () =>{
    return{
        type: actionTypes.FETCH_ORDERS_START
    }
}
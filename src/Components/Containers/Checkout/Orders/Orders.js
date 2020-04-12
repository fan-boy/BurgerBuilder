import React,{Component} from 'react';

import axios from '../../../../axios-order';

import OrderItem from '../../../Order/order';
import {connect} from 'react-redux';
import * as actionTypes from '../../../../Store/actions/index';
import errorHandler from '../../../../hoc/ErrorBoundary/withErrorHandler';
import Spinner from '../../../UI/Spinner/Spinner';

class Orders extends Component {

    

    componentDidMount(){
            this.props.startFetch();
            this.props.fetchOrders(this.props.authToken);
       
        
    }

    render(){
        
        let LoginError = null;
        if(!this.props.isLoggedIn){
            LoginError = (
                <p>
                    User Not logged in.
                </p>
            );
        }
        return(
            <div>
                {this.props.fetchingOrders ? <Spinner/>:null}
                {LoginError}
                {this.props.orders.map(order =>
                    <OrderItem key = {order.id} ingredients = {order.ingredients} price = {order.price} email = {order.orderData.email}/>
                    )}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        orders : state.order.orders,
        fetchingOrders : state.order.fetchingOrders,
        isLoggedIn: state.auth.isLoggedIn,
        authToken: state.auth.idToken

    }
}
const mapDispatchToProps = dispatch =>{
    return{
        fetchOrders : (token) => dispatch(actionTypes.fetchOrders(token)),
        startFetch: () => dispatch(actionTypes.fetchOrdersStart())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(errorHandler( Orders,axios));

import React,{Component} from 'react';

import axios from '../../../../axios-order';

import OrderItem from '../../../Order/order';
import {connect} from 'react-redux';
import * as actionTypes from '../../../../Store/actions/index';
import errorHandler from '../../../../hoc/ErrorBoundary/withErrorHandler'

class Orders extends Component {

    

    componentDidMount(){
        this.props.startFetch();
        this.props.fetchOrders();
    }

    render(){
        

        return(
            <div>
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
        fetchingOrders : state.order.fetchingOrders

    }
}
const mapDispatchToProps = dispatch =>{
    return{
        fetchOrders : () => dispatch(actionTypes.fetchOrders()),
        startFetch: () => dispatch(actionTypes.fetchOrdersStart())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(errorHandler( Orders,axios));

import React,{Component} from 'react';

import axios from '../../../../axios-order';

import OrderItem from '../../../Order/order';

class Orders extends Component {

    state = {
        orders : [],
        loading: true
    }

    componentDidMount(){
        axios.get('https://burgerbuilder-758b0.firebaseio.com/orders.json')
        .then(
            response => {
                this.setState({loading:false});
                console.log(response.data);
                const fetchedOrders = [];
                for (let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id:key
                    });    
                }
                console.log(fetchedOrders);
                this.setState({orders : fetchedOrders});
            }
        ).catch(
            this.setState({loading:false})
        )
    }

    render(){
        

        return(
            <div>
                {this.state.orders.map(order =>
                    <OrderItem key = {order.id} ingredients = {order.ingredients} price = {order.price} email = {order.orderData.email}/>
                    )}
            </div>
        );
    }
}
export default Orders;

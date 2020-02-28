import React, { Component } from 'react';
import CheckoutSummary from '../../Order/checkoutSummary';


class Checkout extends Component{
    state = {
        ingredients : {
            salad : 1,
            cheese : 1,
            meat :1,
            bacon : 1
        }
    };

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredient = {};
        for (let param of query.entries()){
            ingredient[param[0]] = +param[1];
        }
        this.setState({ingredients:ingredient});
    }
    onOrderedHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }
    onOrderCancelHandler = () =>{
        debugger;
        console.log(this.props);
        this.props.history.goBack();
    }
    render(){
        return(
            <div>
            <CheckoutSummary ingredients = {this.state.ingredients} ordered = {this.onOrderedHandler} cancelled = {this.onOrderCancelHandler}/>
            </div>
        );
    }

    

}

export default Checkout;
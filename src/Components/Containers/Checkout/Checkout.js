import React, { Component } from 'react';
import CheckoutSummary from '../../Order/checkoutSummary';
import ContactData from '../../ContactData/ContactData';
import {Route} from 'react-router-dom';



class Checkout extends Component{
    state = {
        ingredients : null,
        totalPrice : 0
    };

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search);
        const ingredient = {};
        let price = 0;
        for (let param of query.entries()){
            if(param[0] !== "price"){
            ingredient[param[0]] = +param[1];
            }else{
                price = +param[1];
            }
        }
        this.setState({ingredients:ingredient ,
            totalPrice : price
        });
    }
    onOrderedHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }
    onOrderCancelHandler = () =>{
        console.log(this.props);
        this.props.history.goBack();
    }
    render(){
        return(
            <div>
            <CheckoutSummary ingredients = {this.state.ingredients} ordered = {this.onOrderedHandler} cancelled = {this.onOrderCancelHandler}/>
           <Route path = {this.props.match.path + '/contact-data'} render = {() => (<ContactData ingredients = {this.state.ingredients} totalPrice = {this.state.totalPrice}/>)}/>
            </div>
        );
    }

    

}

export default Checkout;
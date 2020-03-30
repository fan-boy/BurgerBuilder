import React, { Component } from 'react';
import CheckoutSummary from '../../Order/checkoutSummary';
import ContactData from '../../ContactData/ContactData';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';



class Checkout extends Component{
    onOrderedHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }
    onOrderCancelHandler = () =>{
        this.props.history.goBack();
    }
    render(){
        return(
            <div>
            <CheckoutSummary ingredients = {this.props.ings} ordered = {this.onOrderedHandler} cancelled = {this.onOrderCancelHandler}/>
           <Route path = {this.props.match.path + '/contact-data'} render = {() => (<ContactData ingredients = {this.props.ings} totalPrice = {this.props.price}/>)}/>
            </div>
        );
    }

    

}

const mapStateToProps = state =>{
    return {

        ings: state.ingredients,
        price: state.totalPrice

    }
}

const mapdispatchToProps = dispatch => {
    return{

    }
}

export default connect(mapStateToProps,mapdispatchToProps) (Checkout);
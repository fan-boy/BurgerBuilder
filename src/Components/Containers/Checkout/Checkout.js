import React, { Component } from 'react';
import CheckoutSummary from '../../Order/checkoutSummary';
import ContactData from '../../ContactData/ContactData';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';



class Checkout extends Component{

    
    onOrderedHandler = () =>{
        this.props.history.replace('/checkout/contact-data');
    }
    onOrderCancelHandler = () =>{
        this.props.history.goBack();
    }
    render(){
        debugger;
       let summary = <Redirect to ='/'/>
        if(this.props.ings){
            let purchaseRedirect = this.props.purchased?<Redirect to='/'/>:null;
            summary = (
                <div>
                {purchaseRedirect}
                <CheckoutSummary ingredients = {this.props.ings} ordered = {this.onOrderedHandler} cancelled = {this.onOrderCancelHandler}/>
                <Route path = {this.props.match.path + '/contact-data'} render = {() => (<ContactData ingredients = {this.props.ings} totalPrice = {this.props.price}/>)}/>
                </div>
            );
        }    
        return(
            <div>
                
                {summary}
             </div>
        );
    }

    

}

const mapStateToProps = state =>{
    return {

        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.initPurchase

    }
}



export default connect(mapStateToProps) (Checkout);
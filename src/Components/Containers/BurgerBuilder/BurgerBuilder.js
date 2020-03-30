import React,{Component} from 'react';
import Auxiliary from '../../../hoc/auxiliary'
import {connect} from 'react-redux';
import Burger from '../../../Components/Burger/Burger'
import BurgerControl from '../../Burger/BuildControls/BuildControl'
import Modal from '../../UI/Modal/Modal'
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';
import axios from '../../../axios-order';
import Spinner from '../../UI/Spinner/Spinner';
import errorHandler from '../../../hoc/ErrorBoundary/withErrorHandler';
import * as actionTypes from '../../../Store/actions';



class BurgerBuilder extends Component{
    state = {
        orderState : false
    }

    componentDidMount (){
        axios.get('https://burgerbuilder-758b0.firebaseio.com/Ingredients.json')
        .then(response =>{
            //this.setState({ingredients:response.data})
        })
    }

    updatePurchaseState = (updatedIngredients) =>{
        const ing = {
            ...updatedIngredients
        };
        const sum = Object.keys(ing).map(igKey => {
            return ing[igKey];
        } ).reduce((sum,el) => {
            return sum+el;
        },0);
        this.setState({purchasable: sum>0});
    }
    

    onOrderHandler = () =>{
        this.setState({orderState : !this.state.orderState});
     }
     onOrderConfirmhandler = () =>{
        this.setState({orderState : !this.state.orderState});
        this.props.history.push({
            pathname:'/checkout'
        });

        //this.props.history.replace('/checkout');
    }
    onOrderCancelHandler = () =>{
        this.setState({orderState: !this.state.orderState});
    }
   

    render(){
        let orderSummary = null;
        
        let burger = <Spinner/>;
        if(this.props.ings != null){
         orderSummary = (<OrderSummary ingredients = {this.props.ings} totalPrice = {this.props.tp} ordered = {this.onOrderConfirmhandler} cancelled = {this.onOrderCancelHandler}/> 
                );
         burger = (
            <Auxiliary>
                <div >
                    <Burger ingredients = {this.props.ings}/> 
                </div>
                
                <div>
                    <BurgerControl 
                     price = {this.props.tp}
                     ingredientAdded = {this.props.onIngredientAdded}
                     ingredientRemoved = {this.props.onIngredientRemoved}
                     orderable = {this.props.purchasable}
                     purchasing = {this.onOrderHandler}/>
                </div>
            </Auxiliary>
        );
        }
        return(
            <Auxiliary>
            <Modal show = {this.state.orderState} backDropClicked = {this.onOrderHandler}>
                {orderSummary}
                 </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.ingredients,
        tp: state.totalPrice,
        purchasable: state.purchase
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdded : (ingName) => dispatch({type : actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
        onIngredientRemoved : (ingName) => dispatch({type : actionTypes.REMOVE_INGREDIENT, ingredientName:ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (errorHandler(BurgerBuilder ,axios));
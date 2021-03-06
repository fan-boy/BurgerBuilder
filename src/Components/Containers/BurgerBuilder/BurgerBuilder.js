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
import * as actions from '../../../Store/actions/index';



class BurgerBuilder extends Component{
    state = {
        orderState : false
    }

    componentDidMount (){
        this.props.onInitIngredients();
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
        if(this.props.isAuthenticated){
        this.setState({orderState : !this.state.orderState});
        }else{
            this.props.setRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
     }
     onOrderConfirmhandler = () =>{
        this.props.onInitOrder();
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
                     purchasing = {this.onOrderHandler}
                     isAuthenticated = {this.props.isAuthenticated}
                     />
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
        ings: state.burgerBuilder.ingredients,
        tp: state.burgerBuilder.totalPrice,
        purchasable: state.burgerBuilder.purchase,
        error : state.burgerBuilder.error,
        isAuthenticated: state.auth.isLoggedIn
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients : () => dispatch(actions.initIngredients()),
        onInitOrder : () => dispatch(actions.purchaseInit()),
        setRedirectPath: (path) => dispatch(actions.setRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (errorHandler(BurgerBuilder ,axios));
import React,{Component} from 'react';
import Auxiliary from '../../../hoc/auxiliary'
import Burger from '../../../Components/Burger/Burger'
import BurgerControl from '../../Burger/BuildControls/BuildControl'
import Modal from '../../UI/Modal/Modal'
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';
import axios from '../../../axios-order';
import Spinner from '../../UI/Spinner/Spinner';
import errorHandler from '../../../hoc/ErrorBoundary/withErrorHandler'


const INGREDIENT_PRICES = {
    salad: 30,
    bacon:40,
    cheese:20,
    meat:50
}
class BurgerBuilder extends Component{
    state = {
        ingredients:{
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat:0
        },
        totalPrice : 20,
        purchasable : false,
        orderState : false
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
    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const priceAdd = INGREDIENT_PRICES[type];
        let oldPrice = this.state.totalPrice;
        let newPrice = oldPrice + priceAdd;
        this.setState({totalPrice : newPrice , ingredients : updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        if(oldCount !==0){
        const newCount = oldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;
        const priceRemove = INGREDIENT_PRICES[type];
        let oldPrice = this.state.totalPrice;
        let newPrice = oldPrice - priceRemove;
        this.setState({totalPrice : newPrice , ingredients : updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    }

    onOrderHandler = () =>{
        this.setState({orderState : !this.state.orderState});
     }
     onOrderConfirmhandler = () =>{
        this.setState({orderState : !this.state.orderState});
        alert('Order Placed');
        const order = {
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
        }
        axios.post('/orders.json',order).then(response =>{
            console.log(response);
        }).catch(error =>{
            console.log(error);
        });
    }
    onOrderCancelHandler = () =>{
        this.setState({orderState: !this.state.orderState});
    }

    render(){
        return(
            <Auxiliary>
            <Modal show = {this.state.orderState} backDropClicked = {this.onOrderHandler}>
                 <OrderSummary ingredients = {this.state.ingredients} totalPrice = {this.state.totalPrice} ordered = {this.onOrderConfirmhandler} cancelled = {this.onOrderCancelHandler}/> 
            </Modal>
            <div >
                <Burger ingredients = {this.state.ingredients}/> 
            </div>
            
            <div>
                <BurgerControl 
                 price = {this.state.totalPrice}
                 ingredientAdded = {this.addIngredientHandler}
                 ingredientRemoved = {this.removeIngredientHandler}
                 orderable = {this.state.purchasable}
                 purchasing = {this.onOrderHandler}/>
            </div>
            </Auxiliary>
        );
    }
}

export default errorHandler(BurgerBuilder ,axios);
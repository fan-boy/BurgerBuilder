import React,{Component} from 'react';
import InputElement from '../UI/InputElement/InputElement';
import buttonclasses from '../UI/Button/Button.css'
import axios from '../../axios-order';
import Spinner from '../UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom';
import * as orderActions from '../../Store/actions/order';
import withErrorHandler from '../../hoc/ErrorBoundary/withErrorHandler';

import classes from './ContactData.css';
import { connect } from 'react-redux';


class ContactData extends Component{
    

   

    state = {
        orderform:{
        name:{
             elementType: "input" ,
             elementConfig: { type:"text", placeholder: "Name"},
             value:null ,
             validity:{
             required :true
             },
             isValid:false
            },
        contactNumber:{ 
            elementType: "input" ,
            elementConfig: { type:"text", placeholder: "Contact Number"},
            value:null,
            validity:{
                required :true
                },
            isValid:false
            },
        street:{ 
            elementType: "input" , 
            elementConfig: { type:"text", placeholder: "Street"},
            value:null , 
            validity:{
                required :true
                },
            isValid:false    
            },
        postalcode:{ 
            elementType: "input" , 
            elementConfig: { type:"text", placeholder: "Postal Code"},
            value:null , 
            validity:{
                required :false
                },
            isValid:false    
            },
        deliveryMethod:{elementType:"select",elementConfig:{
            options:[
                {value:'' ,displayValue:'Select one'},
                {value:'fastest',displayValue:'Fastest'},
                {value:'cheapest',displayValue:'Cheapest'}
            ],
            placeholder:"Delivery Method",
            
            required:false
        },
        value : null }
        },
        purchasing :false,
        shouldValidate:false


    }

    componentDidMount(){
        console.log(this.state);
    }

    createStateObject = (eletype,placeholder) =>{
        return (
            "{ elementType: input , elementConfig: { type:"+eletype+", placeholder: "+placeholder+"},value:null}"
        );
    }
    onOrderClick = (event) =>{
        event.preventDefault();
        let inputValidated = this.validateInputOnOrder();
        let isValidated = true
        for (let input in inputValidated){
            if(inputValidated[input] === false){
                isValidated = false;    
            }
        }
        if(isValidated){
            this.props.onOrderStart();
            const formData = {};
            for (let formElement in this.state.orderform){
                formData[formElement] = this.state.orderform[formElement].value;
            }
            formData["email"] = this.props.email;
            if(this.props.ingredients){
                const order = {
                    ingredients: this.props.ingredients,
                    price: this.props.totalPrice,
                    orderData: formData
                }
        this.props.onOrderPlace(order,this.props.token);
            

        }else{
            alert("No Ingredients Selected");
            this.props.history.push("/");
        }
    }else{
        alert("All Required fields not filled");
    }
        
    } 
    validateInputOnOrder = () =>{

        let isValidated = {};
        for (let formElement in this.state.orderform){
            if(this.state.orderform[formElement].isValid){
                
                    isValidated[formElement] = true;
                
            }
            else{
                
                isValidated[formElement] = false;
            }
        }
        this.setState({shouldValidate:true});
        return isValidated;

    }

    validateInputOnChange = (value,rules) =>{
        let isValid = true; 
        if(rules && rules.required){
             if(!value || value.trim() === ""){
                    isValid = false;
             }
         }  
         return isValid; 

    } 


    onInputElementChange = (event,inputIdentifier) =>{
        let newOrderState = {
            ...this.state.orderform
        };
        const updatedFormElement = {...newOrderState[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.isValid = this.validateInputOnChange(updatedFormElement.value,updatedFormElement.validity);
        newOrderState[inputIdentifier] = updatedFormElement;
        this.setState({
            orderform:newOrderState
        });

    }

    render(){
        let formElementArray = [];
        for(let key in this.state.orderform){
            formElementArray.push({
                id : key,
                config : this.state.orderform[key] 
            }); 
        }
        let form = (
            <form className = {classes.Form}>
                    {formElementArray.map(formElement =>(
                        <InputElement inputType = {formElement.config.elementType}
                        key = {formElement.id}
                        label = {formElement.config.elementConfig.placeholder} 
                        value = {formElement.config.value} 
                        elementConfig = {formElement.config.elementConfig}
                        isValid = {formElement.config.isValid}
                        shouldValidate = {this.state.shouldValidate}
                        changed = {(event) => this.onInputElementChange(event , formElement.id)}/> 
                        ))}
                    <button className = {buttonclasses.Success} onClick = {this.onOrderClick}>Order</button>            
            </form>
        );
        if(this.props.loading){
            form = <Spinner />;
        }

        return(
            
                <div className = {classes.Contactdata}>
                    <h1>Personal Info</h1>
                    <br/>
                    
                {form}
                </div>
            
        );
    }

}
const mapStateToProps = state =>{
    return{
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.purchasing,
        initPurchasing: state.order.initPurchase,
        token: state.auth.idToken,
        email: state.auth.email
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onOrderPlace : (orderData,token) => dispatch (orderActions.placeOrder(orderData,token)),
        onOrderStart : () => dispatch(orderActions.setPurchasing())
    }

}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(withRouter(ContactData),axios));
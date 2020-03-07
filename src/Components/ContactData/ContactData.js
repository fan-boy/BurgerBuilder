import React,{Component} from 'react';
import InputElement from '../UI/InputElement/InputElement';
import buttonclasses from '../UI/Button/Button.css'
import axios from '../../axios-order';
import Spinner from '../UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom';


import classes from './ContactData.css';


class ContactData extends Component{

    state = {
        orderform:{
        name:{ elementType: "input" , elementConfig: { type:"text", placeholder: "Name"},value:null},
        contactNumber:{ elementType: "input" , elementConfig: { type:"text", placeholder: "Contact Number"},value:null},
        email:{ elementType: "input" , elementConfig: { type:"text", placeholder: "Email"},value:null},
        street:{ elementType: "input" , elementConfig: { type:"text", placeholder: "Street"},value:null},
        postalcode:{ elementType: "input" , elementConfig: { type:"text", placeholder: "Postal Code"},value:null},
        deliveryMethod:{elementType:"select",elementConfig:{
            options:[
                {value:'' ,displayValue:'Select one'},
                {value:'fastest',displayValue:'Fastest'},
                {value:'cheapest',displayValue:'Cheapest'}
            ],
            placeholder:"Delivery Method"
        },
        value : null }
        },
        purchasing :false


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
        const formData = {};
        for (let formElement in this.state.orderform){
            formData[formElement] = this.state.orderform[formElement].value;
        }
        if(this.props.ingredients){
            const order = {
                ingredients: this.props.ingredients,
                price: this.props.price,
                orderData: formData
            }
        
       this.setState({purchasing:true});
        axios.post('/orders.json',order).then(response =>{
            this.setState({purchasing:false});
            this.props.history.push('/');
        }).catch(error =>{
            this.setState({purchasing:false});
            console.log(error);
        });
    }else{
        alert("No Ingredients Selected");
        this.props.history.push("/");
    }
        
    } 

    onInputElementChange = (event,inputIdentifier) =>{
        let newOrderState = {
            ...this.state.orderform
        };
        const updatedFormElement = {...newOrderState[inputIdentifier]};
        updatedFormElement.value = event.target.value;
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
                        changed = {(event) => this.onInputElementChange(event , formElement.id)}/> 
                        ))}
                    <button className = {buttonclasses.Success} onClick = {this.onOrderClick}>Order</button>            
            </form>
        );
        if(this.state.purchasing){
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
export default withRouter(ContactData);
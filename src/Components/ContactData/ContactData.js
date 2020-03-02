import React,{Component} from 'react';
import Textbox from '../UI/Textbox/Textbox';
import buttonclasses from '../UI/Button/Button.css'
import axios from '../../axios-order';
import Spinner from '../UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom';


import classes from '../ContactData/ContactData.css'


class ContactData extends Component{

    state = {
        name:'',
        contactNumber:'',
        email:'',
        address:{
            street:'',
            postalcode:''
        },
        purchasing :false


    }

    onOrderClick = (event) =>{
        event.preventDefault();
        debugger;
        console.log(this.props.totalPrice);
        if(this.props.ingredients){
        const order = {
            ingredients : this.props.ingredients,
            price : this.props.totalPrice,
            contactNumber : '213123',
            email:'helloworldevs@gmail.com'
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

    render(){
        let form = (
            <form className = {classes.Form}>
                    <Textbox class = {classes.Input} placeholder = "Name" />
                    <Textbox class = {classes.Input} placeholder = "Contact Number" />       
                    <button className = {buttonclasses.Success} onClick = {this.onOrderClick}>Order</button>            
            </form>
        );
        if(this.state.purchasing){
            form = <Spinner />;
        }

        return(
            
                <div className = {classes.ContactData}>
                    <h1>Personal Info</h1>
                    <br/>
                    
                {form}
                </div>
            
        );
    }

}
export default withRouter(ContactData);
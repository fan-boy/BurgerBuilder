import React,{Component} from 'react';
import Textbox from '../UI/Textbox/Textbox';
import Button from '../UI/Button/Button';
import classes from '../ContactData/ContactData.css'


class ContactData extends Component{

    state = {
        name:'',
        contactNumber:'',
        email:'',
        address:{
            street:'',
            postalcode:''
        }

    }

    render(){

        return(
                <div className = {classes.ContactData}>
                <h1>Personal Info</h1>
                <br/>
                <form className = {classes.Form}>
                <Textbox class = {classes.Input} placeholder = "Name" />
                <Textbox class = {classes.Input} placeholder = "Contact Number" />       
                <Button btnType = "Success  ">Submit Order</Button>            
                </form>
                
                </div>
            
        );
    }

}
export default ContactData;
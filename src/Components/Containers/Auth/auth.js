import React , {Component} from 'react';
import InputElement from '../../UI/InputElement/InputElement';
import buttonclasses from '../../UI/Button/Button.css';
import classes from './auth.css';
import * as actionTypes from '../../../Store/actions/index';
import Spinner from '../../UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Auth extends Component{
    state = {
        controls:{
            email:{
                elementType: "input" , 
                elementConfig: { type:"email", placeholder: "Email"},
                value:null, 
                validity:{
                   required : true,
                   isEmail: true
                   },
               isValid:false
               },
               password:{
                elementType: "input" , 
                elementConfig: { type:"password", placeholder: "Password"},
                value:null, 
                validity:{
                   required :true,
                   minlength : 6
                   },
               isValid:false
               },
        },
        shouldValidate : true,
        isSignUp: true
    }

    validateInputOnChange = (value,rules) =>{
        let isValid = true; 
        if(rules && rules.required){
             if(!value || value.trim() === ""){
                    isValid = false;
             }
         }
         if(rules && rules.minlength){
             if(Object.keys(value).length < rules.minlength ){
                 isValid = false;
             }
         }
         if(rules && rules.isEmail){
             let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
             isValid = re.test(value);
         }
          
         return isValid; 

    }

    componentDidMount(){
        if(!this.props.building){
            this.props.setRedirectPath('/');
        }
    }

    onInputElementChange = (event,inputIdentifier) =>{
        let newOrderState = {
            ...this.state.controls
        };
        const updatedFormElement = {...newOrderState[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.isValid = this.validateInputOnChange(updatedFormElement.value,updatedFormElement.validity);
        newOrderState[inputIdentifier] = updatedFormElement;
        this.setState({
            controls:newOrderState
        });

    }

    onAuth = (event) =>{
        event.preventDefault();
        const method = this.state.isSignUp? 'SIGNUP':'SIGNIN';
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,method);  
        
    }

    switchAuthModeHandler = () =>{
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp};
        })
    }

    validateLogin = (event) =>{
        event.preventDefault();
    }
    render(){
        let formElementArray = [];
        for(let key in this.state.controls){
            formElementArray.push({
                id : key,
                config : this.state.controls[key] 
            }); 
        }
        let form = formElementArray.map(formElement =>(
            <InputElement
                key = {formElement.id}
                label = {formElement.config.elementConfig.placeholder}
                value = {formElement.config.value} 
                elementConfig = {formElement.config.elementConfig}
                isValid = {formElement.config.isValid}
                shouldValidate = {this.state.shouldValidate}
                changed = {(event) => this.onInputElementChange(event,formElement.id)}
            />
        ));
        if(this.props.loading){
            form = <Spinner/>
        }

        let errorMessage = null;
        if(this.props.error && this.props.error !== 'false'){
            errorMessage = (
                <p className = {classes.error}>
                    {this.props.error.message}
                </p>
            )
        }
        let redirect = null;
        if(this.props.isLoggedIn){
            redirect = <Redirect to = {this.props.authRedirectPath}/>
        }
        
        return(
            <div className = {classes.Auth}>
                <div>{redirect}</div>
                <form className ={classes.Form} onSubmit = {this.onAuth}>
                    {form}
                    <button className = {buttonclasses.Success}>
                        {this.state.isSignUp? 'Sign Up':'Log In'}
                    </button>
                </form>
                <div>
        <button className = {buttonclasses.Danger} onClick = {this.switchAuthModeHandler}> Switch to {this.state.isSignUp ? 'Sign In':'Sign Up'}</button>
                </div>
                {errorMessage}
            </div>

        );
    }
}

const mapStateToProps = state =>{
    return{
        idToken: state.auth.idToken,
        loading: state.auth.loading,
        error: state.auth.error,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.redirectPath,
        isLoggedIn: state.auth.isLoggedIn
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email,password,method) => dispatch(actionTypes.auth(email,password,method)),
        setRedirectPath:(path) => dispatch(actionTypes.setRedirectPath(path)) 
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth)
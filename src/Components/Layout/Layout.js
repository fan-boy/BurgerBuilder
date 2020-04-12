import React, { Component } from 'react';
import Auxiliary from '../../hoc/auxiliary'
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component {
    state = {
        showSideDrawer : false
        
    }
    sideDrawerOpenClosedHandler = () =>{
        this.setState((prevState) =>   {
        return { showSideDrawer:!prevState.showSideDrawer}
        });
        //let newState = {...this.state.showSideDrawer};
        //newState = !newState;
        //this.setState({
        //    showSideDrawer : newState
        //});
    }
       render(){
        return(
           <Auxiliary>
        <div>
            <Toolbar menuClick = {this.sideDrawerOpenClosedHandler} isLoggedIn = {this.props.isLoggedIn}/> 
            <SideDrawer open = {this.state.showSideDrawer} isLoggedIn = {this.props.isLoggedIn}sideDrawerclose = {this.sideDrawerOpenClosedHandler}/>
        </div>
        <main className = {classes.Content}>
            {this.props.children}
        </main>
        </Auxiliary>
        );
    }
}  

const mapStateToProps = state =>{
    return{
        isLoggedIn: state.auth.isLoggedIn 
    }
}


export default connect(mapStateToProps,null)(Layout);
import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, withRouter , Redirect} from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Components/Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Components/Containers/Checkout/Checkout';
import Orders from './Components/Containers/Checkout/Orders/Orders';
import Logout from './Components/Containers/Auth/Logout/Logout';
import Auth from './Components/Containers/Auth/auth';
import {connect} from 'react-redux';
import * as actionTypes from './Store/actions/index';

class App extends Component {
  componentDidMount(){
    this.props.checkAuthState();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
        <Layout>
          <Switch>
          <Route path ="/" exact component = {BurgerBuilder}/>
          <Route path = "/auth" exact component = {Auth} /> 
          {this.props.isAuthenticated?<Route path = "/checkout" component = {Checkout} />: null}
          {this.props.isAuthenticated?<Route path = "/orders" component = {Orders} />: null}
          
          <Route path = "/logout" exact component = {Logout} />
          <Redirect to = '/'/>
          </Switch>
        </Layout>
        </BrowserRouter>
          
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isAuthenticated: state.auth.isLoggedIn
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    checkAuthState: () => dispatch(actionTypes.authCheckState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);

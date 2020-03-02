import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Components/Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Components/Containers/Checkout/Checkout';
import Orders from './Components/Containers/Checkout/Orders/Orders';
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <Layout>
          <Switch>
          <Route path ="/" exact component = {BurgerBuilder}/> 
          <Route path = "/orders" component = {Orders} />
          </Switch>
        </Layout>
        </BrowserRouter>
          
      </div>
    );
  }
}

export default App;

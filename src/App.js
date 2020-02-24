import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Components/Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Components/Containers/Checkout/Checkout';
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
        <Layout>
          <Switch>
          <Route path ="/" exact component = {BurgerBuilder}/> 
          <Route path = "/checkout" component = {Checkout} />
          </Switch>
        </Layout>
        </BrowserRouter>
          
      </div>
    );
  }
}

export default App;

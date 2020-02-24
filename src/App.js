import React, { Component } from 'react';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Components/Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Components/Containers/Checkout/Checkout';
class App extends Component {
  render() {
    return (
      <div>
        Hello
        <Layout>
          <BurgerBuilder/> 
          <Checkout />

        </Layout>
          
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Components/Containers/BurgerBuilder/BurgerBuilder'
class App extends Component {
  render() {
    return (
      <div>
        Hello
        <Layout>
          <BurgerBuilder/> 
        </Layout>
          
      </div>
    );
  }
}

export default App;

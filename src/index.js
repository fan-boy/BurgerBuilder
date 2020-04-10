import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import App from './App';
import {createStore,applyMiddleware} from 'redux';
import registerServiceWorker from './registerServiceWorker';
import reducer from './Store/reducers/burgerBuilder';
import thunk from 'redux-thunk';

const store = createStore(reducer,applyMiddleware(thunk));
const app = (
    <Provider store = {store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import configureStore from './component/redux/store/configstore'

import App from './App';

const store = configureStore()

store.subscribe(() => {
    console.log('state', store.getState())
})

const ele = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(ele, document.getElementById('root'));

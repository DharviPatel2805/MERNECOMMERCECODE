import React from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from './reducers';

import './index.css';
import App from './App';
import "antd/dist/antd.min.css";


const store = configureStore( {reducer:rootReducer}, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
     document.getElementById('root'));

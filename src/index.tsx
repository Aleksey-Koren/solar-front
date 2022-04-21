import React from 'react';
import './index.css';
import App from './App';
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import {Provider} from "react-redux";
import ReactDOM from 'react-dom';
import {composeWithDevTools} from "@redux-devtools/extension";

const reducers = combineReducers({});
export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk, promise)));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);


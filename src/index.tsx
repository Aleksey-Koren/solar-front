import React from 'react';
import './index.css';
import App from './App';
import {applyMiddleware, combineReducers, createStore} from "redux";
import promise from "redux-promise-middleware";
import {Provider} from "react-redux";
import ReactDOM from 'react-dom';
import {composeWithDevTools} from "@redux-devtools/extension";
import {IProductsState, productReducer} from "./component/product/productReducer";

export interface IState {
    products: IProductsState
}

const reducers = combineReducers({
    products: productReducer
});
export const store = createStore(reducers, composeWithDevTools(applyMiddleware(promise)));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);


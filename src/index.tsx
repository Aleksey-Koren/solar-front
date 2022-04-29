import React from 'react';
import './index.css';
import App from './App';
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import {Provider, TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import ReactDOM from 'react-dom';
import {composeWithDevTools} from "@redux-devtools/extension";
import {productReducer} from "./redux/products/productReducer";
import {planetReducer} from "./redux/planets/planetReducer";

const reducers = combineReducers({
    products: productReducer,
    planets: planetReducer
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk, promise)));

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);


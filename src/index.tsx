import React from 'react';
import './index.css';
import App from './App';
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import {Provider} from "react-redux";
import ReactDOM from 'react-dom';
import {composeWithDevTools} from "@redux-devtools/extension";
import {planetReducer} from "./redux/planets/planetReducer";
import {PlanetState} from "./redux/planets/planetTypes";

export interface IState {
    planets: PlanetState
}

const reducers = combineReducers({planets: planetReducer});
export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk, promise)));

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
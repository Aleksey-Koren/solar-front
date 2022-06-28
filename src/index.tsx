import React from 'react';
import './index.css';
import App from './App';
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import promise from "redux-promise-middleware";
import {Provider, TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import ReactDOM from 'react-dom';
import {productReducer} from "./redux/products/productReducer";
import {planetReducer} from "./redux/planets/planetReducer";
import thunk from "redux-thunk";
import {permissionsReducer} from "./redux/permissions/permissionsReducer";
import {usersReducer} from "./redux/users/usersReducer";
import {stationsReducer} from "./redux/stations/stationsReducer";
import {messengerReducer} from "./redux/messenger/messengerReducer";
import {appReducer} from "./redux/app/appReducer";
import ConfirmModal from "./component/confirm-modal/ConfirmModal";
import {inventoryTypesReducer} from "./redux/inventory-type/inventoryTypesReducer";

const reducers = combineReducers({
    products: productReducer,
    planets: planetReducer,
    permissions: permissionsReducer,
    users: usersReducer,
    stations: stationsReducer,
    messenger: messengerReducer,
    app: appReducer,
    inventoryTypes: inventoryTypesReducer
});

export const store = configureStore({reducer: reducers, devTools: true, middleware: [thunk, promise]})

export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector


ReactDOM.render(
    <Provider store={store}>
        <App/>
        <ConfirmModal/>
    </Provider>,
    document.getElementById('root')
);


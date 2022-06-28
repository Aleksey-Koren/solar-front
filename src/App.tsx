import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import Registration from "./component/registration/Registration";
import LoginForm from "./component/login/LoginForm";
import Planets from "./component/planets/Planets";
import ProductTable from "./component/products/Products";

import PlanetForm from "./component/planets/form/PlanetForm";
import Permissions from "./component/permissions/Permissions";
import Users from './component/users/Users';
import Stations from "./component/stations/Stations";
import Messenger from "./component/messenger/Messenger";
import InventoryTypes from "./component/inventory-types/InventoryTypes";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Messenger/>}></Route>
                <Route path={"/registration"} element={<Registration/>}/>
                <Route path={"/login"} element={<LoginForm/>}/>
                <Route path={"/products"} element={<ProductTable/>}/>
                <Route path={"/planets"} element={<Planets/>}/>
                <Route path={"/planet-form"} element={<PlanetForm/>}/>
                <Route path={"/permissions"} element={<Permissions/>}/>
                <Route path={"/users"} element={<Users/>}/>
                <Route path={"/stations"} element={<Stations/>}/>
                <Route path={"/inventory-types"} element={<InventoryTypes/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

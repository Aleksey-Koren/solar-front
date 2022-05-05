import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import Registration from "./component/registration/Registration";
import LoginForm from "./component/login/LoginForm";
import Navbar from "./component/navbar/Navbar";
import Planets from "./component/planets/Planets";
import ProductTable from "./component/products/Products";

import PlanetForm from "./component/planets/form/PlanetForm";
import Permissions from "./component/permissions/Permissions";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Navbar/>}/>
                <Route path={"/registration"} element={<Registration/>}/>
                <Route path={"/login"} element={<LoginForm/>}/>
                <Route path={"/products"} element={<ProductTable/>}/>
                <Route path={"/planets"} element={<Planets/>}/>
                <Route path={"/planet-form"} element={<PlanetForm/>}/>
                <Route path={"/permissions"} element={<Permissions/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

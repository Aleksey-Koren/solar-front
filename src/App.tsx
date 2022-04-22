import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import Registration from "./component/registration/Registration";
import LoginForm from "./component/login/LoginForm";
import Navbar from "./component/navbar/Navbar";
import ProductTable from "./component/product/ProductTable";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Navbar/>}/>
                <Route path={"/registration"} element={<Registration/>}/>
                <Route path={"/login"} element={<LoginForm/>}/>
                <Route path={"/product"} element={<ProductTable/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

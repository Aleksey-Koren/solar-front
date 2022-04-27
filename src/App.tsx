import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import Registration from "./component/registration/Registration";
import LoginForm from "./component/login/LoginForm";
import Navbar from "./component/navbar/Navbar";
import Planets from "./component/planets/Planets";
import ProductTable from "./component/products/Products";


function App() {

    return (
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Navbar/>}/>
                    <Route path={"/registration"} element={<Registration/>}/>
                    <Route path={"/login"} element={<LoginForm/>}/>
                    <Route path={"/products"} element={<ProductTable/>}/>
                    <Route path={"/planets"} element={<Planets/>}/>
                </Routes>
            </BrowserRouter>
    );
}
export default App;
import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import {axiosApi} from "./http/axios";
import Registration from "./component/registration/Registration";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={
                    <>
                        <button onClick={() => axiosApi.get("users/1")}>CLICK</button>
                    </>
                }/>
                <Route path={"/login"} element={<>LOGIN</>}/>
                <Route path={"/registration"} element={<Registration/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

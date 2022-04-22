import './Navbar.css'
import {Link, useNavigate} from "react-router-dom";
import React from "react";

function Navbar() {
    let navigate = useNavigate();

    return (
        <div className={"navbar"}>
            <Link className={"navbar__link link_hover"} to={"/"}>Star Map</Link>
            <Link className={"navbar__link link_hover"} to={"/"}>Dashboard</Link>
            <div className={"navbar__dropdown_menu"}>
                <p className={"navbar__link"}>Config</p>
                <div className={"navbar__menu_list"}>
                    <Link to="/planets">Planets Management</Link>
                    <Link to="/">Products Management</Link>
                    <Link to="/">Stations Management</Link>
                    <Link to="/">Inventory Management</Link>
                    <Link to="/">Permissions Management</Link>
                    <Link to="/">Users Management</Link>
                </div>
            </div>
            <p className={"navbar__logout link_hover"} onClick={() => {
                localStorage.removeItem('token');
                navigate('/login')
            }}>Logout</p>
        </div>
    );
}

export default Navbar;
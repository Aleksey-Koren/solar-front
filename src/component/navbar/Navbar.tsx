import './Navbar.css'
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {fetchProductsAction} from "../../redux/products/productActions";
import {findPlanetsAndStars} from "../../redux/planets/planetActions";
import {useAppDispatch} from "../../index";
import {findAllPermissions} from "../../redux/permissions/permissionsActions";
import {findUsers} from "../../redux/users/usersActions";

function Navbar() {
    let navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onPlanetsClick = () => dispatch(findPlanetsAndStars(0, 10));
    const onProductsClick = () => dispatch(fetchProductsAction(0, 10));
    const onPermissionsClick = () => dispatch(findAllPermissions());
    const onUsersClick = () => dispatch(findUsers(0, 10));


    return (
        <div className={"navbar"}>
            <Link className={"navbar__link link_hover"} to={"/"}>Star Map</Link>
            <Link className={"navbar__link link_hover"} to={"/"}>Dashboard</Link>
            <div className={"navbar__dropdown_menu"}>
                <p className={"navbar__link"}>Config</p>
                <div className={"navbar__menu_list"}>
                    <Link to="/planets" onClick={onPlanetsClick}>Planets Management</Link>
                    <Link to="/products" onClick={onProductsClick}>Products Management</Link>
                    <Link to="/stations">Stations Management</Link>
                    <Link to="/">Inventory Management</Link>
                    <Link to="/permissions" onClick={onPermissionsClick}>Permissions Management</Link>
                    <Link to="/users" onClick={onUsersClick}>Users Management</Link>
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
import './Navbar.css'
import {Link, useNavigate} from "react-router-dom";
import React from "react";
import {fetchProductsAction} from "../../redux/products/productActions";
import {findPlanetsAndStars} from "../../redux/planets/planetActions";
import {useAppDispatch} from "../../index";
import {findAllPermissions} from "../../redux/permissions/permissionsActions";
import {findUsers} from "../../redux/users/usersActions";
import {fetchInventoryTypes} from "../../redux/inventory-type/inventoryTypesActions";

function Navbar() {
    let navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onPlanetsClick = () => dispatch(findPlanetsAndStars(0, 10));
    const onProductsClick = () => dispatch(fetchProductsAction(0, 10));
    const onPermissionsClick = () => dispatch(findAllPermissions());
    const onUsersClick = () => dispatch(findUsers(0, 10));
    const onInventoryTypesClick = () => dispatch(fetchInventoryTypes(0, 10));


    return (
        <div className={"navbar"}>
            <nav className={"menu"}>
                <ul className={"menu__list"}>
                    <li><Link className={"menu__link link_hover"} to={"/"}>Star Map</Link></li>
                    <li><Link className={"menu__link link_hover"} to={"/"}>Dashboard</Link></li>
                    <li>
                        <p className={"menu__link"}>Config</p>
                        <ul className="sub-menu__list">
                            <li>
                                <Link to="/planets" onClick={onPlanetsClick} className={"menu__link"}>Planets
                                    Management</Link>
                            </li>
                            <li>
                                <Link to="/products" onClick={onProductsClick} className={"menu__link"}>Products
                                    Management</Link>
                            </li>
                            <li><Link to="/stations" className={"menu__link"}>Stations Management</Link></li>
                            <li>
                                <Link to="/" className={"menu__link"}>Inventory Management</Link>
                                <ul className="sub-sub-menu__list">
                                    <li><Link to="/" className={"menu__link"}>Object Editor</Link></li>
                                    <li>
                                        <Link to="/inventory-types" onClick={onInventoryTypesClick}
                                              className={"menu__link"}>Inventory Types</Link>
                                    </li>
                                    <li><Link to="/" className={"menu__link"}>Inventory Descriptions</Link></li>
                                    <li><Link to="/" className={"menu__link"}>Inventory Modifications</Link></li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/permissions" onClick={onPermissionsClick} className={"menu__link"}>Permissions
                                    Management</Link>
                            </li>
                            <li>
                                <Link to="/users" onClick={onUsersClick} className={"menu__link"}>Users
                                    Management</Link>
                            </li>
                        </ul>
                    </li>
                    <li><p className={"navbar__logout link_hover"} onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/login')
                    }}>Logout</p></li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
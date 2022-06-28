import globalStyle from '../global-styles/GlobalStyles.module.css'
import Navbar from "../navbar/Navbar";
import React from "react";


function InventoryTypes() {

    return (
        <div className={globalStyle.wrapper}>
            <Navbar/>
            <h1 className={globalStyle.page_title}>
                Inventory Types
            </h1>
        </div>
    );
}

export default InventoryTypes;
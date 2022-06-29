import {TableCell, TableHead, TableRow} from "@mui/material";
import inventoryTypesTableStyles from '../InventoryTypes.module.css'
import React from "react";

function InventoryTypesTableHeader() {

    return (
        <TableHead className={inventoryTypesTableStyles.MuiTableCell_head}>
            <TableRow>
                <TableCell classes={{head: inventoryTypesTableStyles.MuiTableCell_head}} align="center"> # </TableCell>
                <TableCell classes={{head: inventoryTypesTableStyles.MuiTableCell_head}} align="center"> Title </TableCell>
            </TableRow>
        </TableHead>
    );
}

export default InventoryTypesTableHeader;
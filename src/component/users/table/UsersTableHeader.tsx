import {TableCell, TableHead, TableRow} from "@mui/material";
import React from "react";
import usersStyle from '../Users.module.css'

function UsersTableHeader() {

    return (
        <TableHead className={usersStyle.MuiTableCell_head}>
            <TableRow>
                <TableCell classes={{head: usersStyle.MuiTableCell_head}} align="center"> # </TableCell>
                <TableCell classes={{head: usersStyle.MuiTableCell_head}} align="center"> Title </TableCell>
            </TableRow>
        </TableHead>
    );
}

export default UsersTableHeader;
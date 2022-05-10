import {Checkbox, TableCell, TableHead, TableRow} from "@mui/material";
import React from "react";
import globalStyles from '../../GlobalStyles.module.css'
import usersStyle from '../Users.module.css'

function UsersTableHeader() {

    return (
        <TableHead className={usersStyle.MuiTableCell_head}>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox className={globalStyles.header_checkbox}/>
                </TableCell>
                <TableCell classes={{head: usersStyle.MuiTableCell_head}} align="center"> # </TableCell>
                <TableCell classes={{head: usersStyle.MuiTableCell_head}} align="center"> Title </TableCell>
            </TableRow>
        </TableHead>
    );
}

export default UsersTableHeader;
import {Table, TableContainer} from "@mui/material";
import usersStyle from "../Users.module.css";
import UsersTableHeader from "./UsersTableHeader";
import UsersTableBody from "./UsersTableBody";
import UsersTableFooter from "./UsersTableFooter";
import React from "react";

function UsersTable() {

    return (
        <TableContainer className={usersStyle.MuiTableContainer_root}>
            <Table>
                <UsersTableHeader/>
                <UsersTableBody/>
                <UsersTableFooter/>
            </Table>
        </TableContainer>
    )
}

export default UsersTable
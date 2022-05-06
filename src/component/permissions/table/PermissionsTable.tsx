import {Table, TableContainer} from "@mui/material";
import style from "../Permissions.module.css";
import PermissionsTableHeader from "./PermissionsTableHeader";
import PermissionsTableBody from "./PermissionsTableBody";
import React, {Dispatch, SetStateAction} from "react";
import {useAppSelector} from "../../../index";

export interface TableProps {
    selectedPermissionsIds: number[];
    setSelectedPermissionsIds: Dispatch<SetStateAction<number[]>>;
}

function PermissionsTable(props: TableProps) {
    const permissions = useAppSelector(state => state.permissions.permissions);

    return (
        <TableContainer className={style.MuiTableContainer_root}>
            <Table>
                <PermissionsTableHeader permissions={permissions} tableProps={props}/>
                <PermissionsTableBody tableProps={props}/>
            </Table>
        </TableContainer>)
}

export default PermissionsTable;
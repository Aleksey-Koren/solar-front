import {Checkbox, TableCell, TableHead, TableRow} from "@mui/material";
import style from "../Permissions.module.css"
import React from "react";
import {Permission} from "../../../model/Permission";
import {TableProps} from "./PermissionsTable";

function PermissionsTableHeader(props: {
    permissions: Permission[],
    tableProps: TableProps
}) {
    const isCheckboxChecked = props.tableProps.selectedPermissionsIds.length === props.permissions.length;

    const onCheckboxChange = () => {
        if (isCheckboxChecked) {
            props.tableProps.setSelectedPermissionsIds([]);
        } else {
            props.tableProps.setSelectedPermissionsIds(props.permissions.map(permission => permission.id))
        }
    }

    return (
        <TableHead className={style.MuiTableCell_head}>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox className={style.header_checkbox} checked={isCheckboxChecked}
                              onChange={onCheckboxChange}/>
                </TableCell>
                <TableCell classes={{head: style.MuiTableCell_head}} align="center"> # </TableCell>
                <TableCell classes={{head: style.MuiTableCell_head}} align="center"> Permission </TableCell>
            </TableRow>
        </TableHead>
    );
}

export default PermissionsTableHeader;
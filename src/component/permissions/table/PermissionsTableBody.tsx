import {Checkbox, TableBody, TableCell, TableRow} from "@mui/material";
import React from "react";
import {AppState} from "../../../index";
import {connect, ConnectedProps} from "react-redux";
import globalTableStyles from '../../global-styles/MUITable.module.css'
import permissionsStyles from '../Permissions.module.css'
import {editPermission} from "../../../redux/permissions/permissionsActions";
import {Permission} from "../../../model/Permission";
import {TableProps} from "./PermissionsTable";

const PermissionsTableBody: React.FC<Props> = (props) => {

    const onCheckboxChange = (permission: Permission) => {
        if (props.selectedPermissionsIds.includes(permission.id)) {
            const filteredPermissions = props.selectedPermissionsIds.filter(id => id !== permission.id);
            props.setSelectedPermissionsIds(filteredPermissions);
        } else {
            props.setSelectedPermissionsIds([...props.selectedPermissionsIds, permission.id]);
        }
    }

    return (
        <TableBody>
            {props.permissions.map(permission => (
                <TableRow key={permission.id}>

                    <TableCell padding="checkbox" classes={{body: globalTableStyles.MuiTableCell_body}}>
                        <Checkbox className={permissionsStyles.body_checkbox}
                                  onChange={() => onCheckboxChange(permission)}
                                  checked={props.selectedPermissionsIds.includes(permission.id)}
                        />
                    </TableCell>

                    <TableCell padding={"checkbox"} classes={{body: globalTableStyles.MuiTableCell_body}}>
                        {permission.id}
                    </TableCell>

                    <TableCell align={"center"} onClick={() => props.editPermission(permission)}
                               classes={{body: globalTableStyles.MuiTableCell_body, alignCenter: globalTableStyles.MuiTableCell_alignCenter}}>
                        {permission.title}
                    </TableCell>

                </TableRow>
            ))}
        </TableBody>
    );
}

const mapStateToProps = (state: AppState, ownProps: { tableProps: TableProps }) => ({
    permissions: state.permissions.permissions,
    selectedPermissionsIds: ownProps.tableProps.selectedPermissionsIds,
    setSelectedPermissionsIds: ownProps.tableProps.setSelectedPermissionsIds
})

const mapDispatchToProps = {
    editPermission
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(PermissionsTableBody);
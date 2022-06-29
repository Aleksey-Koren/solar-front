import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {TableBody, TableCell, TableRow} from "@mui/material";
import inventoryTypesTableStyles from '../InventoryTypes.module.css'
import {AppState} from "../../../index";
import {editInventoryType} from "../../../redux/inventory-type/inventoryTypesActions";

const InventoryTypesTableBody: React.FC<Props> = (props) => {

    return (
        <TableBody>
            {props.inventoryTypes.map(inventoryType => (
                <TableRow key={inventoryType.id}>

                    <TableCell padding={"checkbox"} classes={{body: inventoryTypesTableStyles.MuiTableCell_body}}>
                        {inventoryType.id}
                    </TableCell>

                    <TableCell align={"center"} classes={{
                        body: inventoryTypesTableStyles.MuiTableCell_body,
                        alignCenter: inventoryTypesTableStyles.MuiTableCell_alignCenter
                    }} onClick={() => props.editInventoryType(inventoryType)}>
                        {inventoryType.title}
                    </TableCell>

                </TableRow>
            ))}
        </TableBody>
    );
}

const mapStateToProps = (state: AppState) => ({
    inventoryTypes: state.inventoryTypes.inventoryTypes
})

const mapDispatchToProps = {
    editInventoryType
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>

export default connector(InventoryTypesTableBody);
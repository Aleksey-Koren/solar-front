import {Table, TableContainer} from "@mui/material";
import InventoryTypesTableBody from "./InventoryTypesTableBody";
import inventoryTypesTableStyles from '../InventoryTypes.module.css'
import CustomTableHeader from "../../global-components/table/CustomTableHeader";
import CustomTableFooter from "../../global-components/table/CustomTableFooter";
import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../../../index";
import {fetchInventoryTypes} from "../../../redux/inventory-type/inventoryTypesActions";

const InventoryTypesTable: React.FC<Props> = (props) => {


    return (
        <TableContainer className={inventoryTypesTableStyles.MuiTableContainer_root}>
            <Table>
                <CustomTableHeader tableHeaderTitles={['#', 'title']}/>
                <InventoryTypesTableBody/>
                <CustomTableFooter currentPage={props.currentPage} itemsPerPage={props.itemsPerPage}
                                   totalItemsAmount={props.totalItemsAmount} totalPagesAmount={props.totalPagesAmount}
                                   onTablePaginationChange={fetchInventoryTypes}/>
            </Table>
        </TableContainer>
    );
}

const mapStateToProps = (state: AppState) => ({
    currentPage: state.inventoryTypes.currentPage,
    itemsPerPage: state.inventoryTypes.itemsPerPage,
    totalItemsAmount: state.inventoryTypes.totalItems,
    totalPagesAmount: state.inventoryTypes.totalPagesAmount
})

const connector = connect(mapStateToProps)

type Props = ConnectedProps<typeof connector>

export default connector(InventoryTypesTable)
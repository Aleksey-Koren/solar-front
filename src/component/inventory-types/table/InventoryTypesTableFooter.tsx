import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../../../index";
import {TableFooter, TablePagination, TableRow} from "@mui/material";
import inventoryTypesTableStyles from '../InventoryTypes.module.css'
import {fetchInventoryTypes} from "../../../redux/inventory-type/inventoryTypesActions";

const InventoryTypesTableFooter: React.FC<Props> = (props) => {

    const onPageChange = (e: React.ChangeEvent<any>, page: number) => props.fetchInventoryTypes(page, props.itemsPerPage);
    const onRowsPerPageChange = (event: React.ChangeEvent<any>) => props.fetchInventoryTypes(0, Number(event.target.value));

    return (
        <TableFooter>
            <TableRow>
                <TablePagination classes={{
                    root: inventoryTypesTableStyles.MuiTablePagination_root,
                    spacer: inventoryTypesTableStyles.MuiTablePagination_spacer,
                    toolbar: inventoryTypesTableStyles.MuiTablePagination_toolbar
                }}
                                 count={props.totalItemsAmount} rowsPerPage={props.itemsPerPage}
                                 page={props.currentPage} rowsPerPageOptions={[5, 10, 25]}
                                 onPageChange={onPageChange} onRowsPerPageChange={onRowsPerPageChange}
                                 labelRowsPerPage={<span>Inventory types on page:</span>}
                                 labelDisplayedRows={({page}) => `Page: ${page + 1}/${props.totalPagesAmount}`}
                                 showFirstButton={true} showLastButton={true}
                />
            </TableRow>
        </TableFooter>
    );
}

const mapStateToProps = (state: AppState) => ({
    totalItemsAmount: state.inventoryTypes.totalItems,
    itemsPerPage: state.inventoryTypes.itemsPerPage,
    currentPage: state.inventoryTypes.currentPage,
    totalPagesAmount: state.inventoryTypes.totalPagesAmount
})

const mapDispatchToProps = {
    fetchInventoryTypes
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export default connector(InventoryTypesTableFooter)
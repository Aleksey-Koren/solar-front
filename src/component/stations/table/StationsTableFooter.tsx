import {AppState} from "../../../index";
import {connect, ConnectedProps} from "react-redux";
import React from "react";
import {TableFooter, TablePagination, TableRow} from "@mui/material";
import styles from "../../products/styles.module.css";

const StationsTableFooter: React.FC<TProps> = (props) => {
    return (
        <div>
            <TableFooter>
                <TableRow>
                    <TablePagination classes={{
                        root: styles.tablePagination_root,
                        spacer: styles.spacer,
                        // actions: styles.actions,
                        selectIcon: styles.actions
                    }}
                                     colSpan={7}
                                     count={props.totalProducts}
                                     onPageChange={() => {}}
                                     page={props.currentPage}
                                     rowsPerPage={props.productsPerPage}
                                     onRowsPerPageChange={() => {}}
                                     rowsPerPageOptions={[10, 20, {value: -1, label: 'Show All'}]}
                                     labelRowsPerPage={<span>Stations per page:</span>}
                                     showFirstButton={true}
                                     showLastButton={true}
                    />
                </TableRow>
            </TableFooter>
        </div>
    )
}

const mapStateToProps = (state: AppState) => ({
    totalProducts: state.stations.totalItems,
    currentPage: state.stations.currentPage,
    productsPerPage: state.stations.itemsPerPage
});

const mapDispatchToProps = {

}

type TProps = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(StationsTableFooter);
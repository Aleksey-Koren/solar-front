import {TableFooter, TablePagination, TableRow} from "@mui/material";
import globalStyle from "../../global-styles/MUITable.module.css";
import React from "react";
import {Page} from "../../../model/util/Page";
import {IPendingAction} from "../../../redux/redux-types";
import {useAppDispatch} from "../../../index";

interface CustomTableFooterProps {
    totalItemsAmount: number;
    itemsPerPage: number;
    currentPage: number;
    totalPagesAmount: number;
    onTablePaginationChange: (page: number, size: number) => IPendingAction<Page<any>>;
}

function CustomTableFooter(props: CustomTableFooterProps) {
    const dispatch = useAppDispatch();

    const onPageChange = (e: React.ChangeEvent<any>, page: number) => dispatch(props.onTablePaginationChange(page, props.itemsPerPage));
    const onRowsPerPageChange = (event: React.ChangeEvent<any>) => dispatch(props.onTablePaginationChange(0, Number(event.target.value)));

    return (
        <TableFooter>
            <TableRow>
                <TablePagination classes={{
                    root: globalStyle.MuiTablePagination_root,
                    spacer: globalStyle.MuiTablePagination_spacer,
                    toolbar: globalStyle.MuiTablePagination_toolbar
                }}
                                 count={props.totalItemsAmount} rowsPerPage={props.itemsPerPage}
                                 page={props.currentPage} rowsPerPageOptions={[5, 10, 25]}
                                 onPageChange={onPageChange} onRowsPerPageChange={onRowsPerPageChange}
                                 labelRowsPerPage={<span>Items on page:</span>}
                                 labelDisplayedRows={({page}) => `Page: ${page + 1}/${props.totalPagesAmount}`}
                                 showFirstButton={true} showLastButton={true}
                />
            </TableRow>
        </TableFooter>
    )
}

export default CustomTableFooter;
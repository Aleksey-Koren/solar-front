import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {TableFooter, TablePagination, TableRow} from "@mui/material";
import usersStyle from "../Users.module.css";
import {AppState} from "../../../index";

const UsersTableFooter: React.FC<Props> = (props) => {

    return (
        <TableFooter>
            <TableRow>
                <TablePagination classes={{
                    root: usersStyle.MuiTablePagination_root,
                    spacer: usersStyle.MuiTablePagination_spacer,
                    toolbar: usersStyle.MuiTablePagination_toolbar
                }}
                                 colSpan={5} count={props.totalUsersAmount} rowsPerPage={props.usersOnPage}
                                 page={props.currentPage} rowsPerPageOptions={[5, 10, 25]}
                                 labelRowsPerPage={<span>Users on page:</span>}
                                 labelDisplayedRows={({page}) => `Page: ${page + 1}/${props.totalPagesAmount}`}
                                 showFirstButton={true} showLastButton={true}
                                 onPageChange={() => console.log('')}
                />
            </TableRow>
        </TableFooter>
    );
}

const mapStateToProps = (state: AppState) => ({
    totalUsersAmount: state.users.totalItems,
    currentPage: state.users.currentPage,
    usersOnPage: state.users.itemsPerPage,
    totalPagesAmount: state.users.totalPagesAmount


})

const connector = connect(mapStateToProps, null);

type Props = ConnectedProps<typeof connector>

export default connector(UsersTableFooter);
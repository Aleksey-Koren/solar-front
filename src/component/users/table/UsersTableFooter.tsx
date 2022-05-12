import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {TableFooter, TablePagination, TableRow} from "@mui/material";
import usersStyle from "../Users.module.css";
import {AppState} from "../../../index";
import {findUsers} from "../../../redux/users/usersActions";

const UsersTableFooter: React.FC<Props> = (props) => {

    const onPageChange = (e: React.ChangeEvent<any>, page: number) => props.findUsers(page, props.usersOnPage);
    const onRowsPerPageChange = (event: React.ChangeEvent<any>) => props.findUsers(0, Number(event.target.value));

    return (
        <TableFooter>
            <TableRow>
                <TablePagination classes={{
                    root: usersStyle.MuiTablePagination_root,
                    spacer: usersStyle.MuiTablePagination_spacer,
                    toolbar: usersStyle.MuiTablePagination_toolbar
                }}
                                 count={props.totalUsersAmount} rowsPerPage={props.usersOnPage}
                                 page={props.currentPage} rowsPerPageOptions={[5, 10, 25]}
                                 onPageChange={onPageChange} onRowsPerPageChange={onRowsPerPageChange}
                                 labelRowsPerPage={<span>Planets on page:</span>}
                                 labelDisplayedRows={({page}) => `Page: ${page + 1}/${props.totalPagesAmount}`}
                                 showFirstButton={true} showLastButton={true}
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

const mapDispatchToProps = {
    findUsers
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>

export default connector(UsersTableFooter);
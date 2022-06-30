import {Table, TableContainer} from "@mui/material";
import usersStyle from "../Users.module.css";
import UsersTableBody from "./UsersTableBody";
import React from "react";
import CustomTableHeader from "../../global-components/table/CustomTableHeader";
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../../../index";
import CustomTableFooter from "../../global-components/table/CustomTableFooter";
import {findUsers} from "../../../redux/users/usersActions";

const UsersTable: React.FC<Props> = (props) => {

    return (
        <TableContainer className={usersStyle.MuiTableContainer_root}>
            <Table>
                <CustomTableHeader tableHeaderTitles={['#', 'Title']}/>
                <UsersTableBody/>
                <CustomTableFooter currentPage={props.currentPage} itemsPerPage={props.itemsPerPage}
                                   totalItemsAmount={props.totalItemsAmount} totalPagesAmount={props.totalPagesAmount}
                                   onTablePaginationChange={findUsers}/>
            </Table>
        </TableContainer>
    )
}

const mapStateToProps = (state: AppState) => ({
    currentPage: state.users.currentPage,
    itemsPerPage: state.users.itemsPerPage,
    totalItemsAmount: state.users.totalItems,
    totalPagesAmount: state.users.totalPagesAmount
})

const connector = connect(mapStateToProps)

type Props = ConnectedProps<typeof connector>

export default connector(UsersTable)
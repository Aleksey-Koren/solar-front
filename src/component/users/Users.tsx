import React, {useEffect, useState} from "react";
import {AppState} from "../../index";
import {connect, ConnectedProps} from "react-redux";
import {findUsers, saveOrUpdateUser} from "../../redux/users/usersActions";
import globalStyle from '../GlobalStyles.module.css'
import usersStyle from './Users.module.css'
import Navbar from "../navbar/Navbar";
import LoadProgress from "../circular-progress/LoadProgress";
import {IconButton, Table, TableContainer} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ErrorPopup from "../error-popup/ErrorPopup";
import UsersTableHeader from "./table/UsersTableHeader";
import UsersTableBody from "./table/UsersTableBody";
import UsersTableFooter from "./table/UsersTableFooter";

const Users: React.FC<Props> = (props) => {
    const [selectedUsersIds, setSelectedUsersIds] = useState([]);

    useEffect(() => {
        props.findUsers(0, 10);
    }, [props.findUsers])


    return (
        <div className={globalStyle.wrapper}>
            <Navbar/>
            <h1 className={globalStyle.page_title}>Users list</h1>

            {props.isLoading
                ? <LoadProgress/>
                : <div>

                    <TableContainer className={usersStyle.MuiTableContainer_root}>
                        <Table>
                            <UsersTableHeader/>
                            <UsersTableBody/>
                            <UsersTableFooter/>
                        </Table>
                    </TableContainer>

                    {selectedUsersIds.length > 0 &&
                        <IconButton>
                            <DeleteIcon className={globalStyle.delete_icon} fontSize={"large"}/>
                        </IconButton>
                    }

                    <IconButton>
                        <AddIcon className={globalStyle.add_icon} fontSize={"large"}/>
                    </IconButton>
                </div>
            }

            <ErrorPopup isError={props.isError} errorMessage={'Server error. Please, refresh page'}/>
        </div>
    )
}

const mapStateToProps = (state: AppState) => ({
    users: state.users.users,
    isError: state.users.isError,
    isLoading: state.users.isLoading,
})

const mapDispatchToProps = {
    findUsers,
    saveOrUpdateUser
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(Users);
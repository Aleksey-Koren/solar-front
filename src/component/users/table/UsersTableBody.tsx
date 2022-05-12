import {TableBody, TableCell, TableRow} from "@mui/material";
import {connect, ConnectedProps} from "react-redux";
import React from "react";
import {AppState} from "../../../index";
import usersStyles from '../Users.module.css'
import {editUser} from "../../../redux/users/usersActions";

const UsersTableBody: React.FC<Props> = (props) => {

    return (
        <TableBody>
            {props.users.map(user => (
                <TableRow key={user.id}>

                    <TableCell padding={"checkbox"} classes={{body: usersStyles.MuiTableCell_body}}>
                        {user.id}
                    </TableCell>

                    <TableCell align={"center"} classes={{
                        body: usersStyles.MuiTableCell_body,
                        alignCenter: usersStyles.MuiTableCell_alignCenter
                    }} onClick={() => props.editUser(user)}>
                        {user.title}
                    </TableCell>

                </TableRow>
            ))}
        </TableBody>
    );
}

const mapStateToProps = (state: AppState) => ({
    users: state.users.users
})

const mapDispatchToProps = {
    editUser
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export default connector(UsersTableBody)
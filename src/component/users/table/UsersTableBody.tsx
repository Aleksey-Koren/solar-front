import {Checkbox, TableBody, TableCell, TableRow} from "@mui/material";
import {connect, ConnectedProps} from "react-redux";
import React from "react";
import {AppState} from "../../../index";
import globalStyles from '../../GlobalStyles.module.css'
import usersStyles from '../Users.module.css'

const UsersTableBody: React.FC<Props> = (props) => {

    return (
        <TableBody>
            {props.users.map(user => (
                <TableRow key={user.id}>

                    <TableCell padding="checkbox" classes={{body: usersStyles.MuiTableCell_body}}>
                        <Checkbox className={globalStyles.body_checkbox}/>
                    </TableCell>

                    <TableCell padding={"checkbox"} classes={{body: usersStyles.MuiTableCell_body}}>
                        {user.id}
                    </TableCell>

                    <TableCell align={"center"} classes={{
                        body: usersStyles.MuiTableCell_body,
                        alignCenter: usersStyles.MuiTableCell_alignCenter
                    }}>
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

const connector = connect(mapStateToProps, null)

type Props = ConnectedProps<typeof connector>

export default connector(UsersTableBody)
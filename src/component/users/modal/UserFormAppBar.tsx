import style from "./UserFormModal.module.css";
import {IconButton, Toolbar, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar/AppBar";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../index";
import {closeEditForm} from "../../../redux/users/usersActions";

function UserFormAppBar() {
    const editedUser = useAppSelector(state => state.users.editedUser);
    const dispatch = useAppDispatch();

    return (
        <AppBar classes={{root: style.app_bar}}>
            <Toolbar>
                <IconButton onClick={() => dispatch(closeEditForm())}>
                    <CloseIcon fontSize={'large'} classes={{root: style.close_icon}}/>
                </IconButton>
                <Typography variant="h4" component="div" flex={1} mx={3}
                            align={"center"}>{editedUser?.title}</Typography>
            </Toolbar>
        </AppBar>
    );
}

export default UserFormAppBar;
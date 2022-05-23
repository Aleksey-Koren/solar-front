import {setIsAddUsersModalOpened} from "../../../../redux/messenger/messengerActions";
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../../../../index";
import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import AddUserSelect from "../../select/AddUserSelect";

const AddUsersModal: React.FC<TProps> = (props) => {

    const handleClose = () => props.setIsAddUsersModalOpened(false);

    return (
        <Dialog open={props.isOpened} onClose={handleClose}>
            <DialogTitle>Add members to room</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    TEST TEXT!!!!!!!!
                </DialogContentText>
                <AddUserSelect/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}

const mapStateToProps = (state: AppState) => ({
    isOpened: state.messenger.isAddUsersModalOpened,
    roomMembers: state.messenger.roomMembers,
    selectedRoom: state.messenger.selectedRoom
})

const mapDispatchToProps = {
    setIsAddUsersModalOpened
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

export default connector(AddUsersModal);
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import React, {ChangeEvent, useState} from "react";
import globalStyles from '../../global-styles/ModalWindow.module.css'
import localStyles from './PermissionsFormModal.module.css'
import {AppState} from "../../../index";
import {connect, ConnectedProps} from "react-redux";
import {saveOrUpdatePermission, setOpenPermissionFormModal} from "../../../redux/permissions/permissionsActions";
import {Permission} from "../../../model/Permission";

const PermissionsFormModal: React.FC<Props> = (props) => {
    const [permissionTitle, setPermissionTitle] = useState<string>(props.editedPermission?.title);
    const [isErrorInput, setErrorInput] = useState<boolean>(false);


    const onSaveButtonClick = () => props.saveOrUpdatePermission(new Permission(props.editedPermission?.id, permissionTitle));

    const onFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            setErrorInput(true)
        } else {
            setErrorInput(false);
            setPermissionTitle(e.target.value)
        }
    }

    return (
        <Dialog open={props.isOpen} fullWidth>
            <DialogTitle className={globalStyles.dialog__title}>Permission Form</DialogTitle>

            <DialogContent className={globalStyles.dialog__content}>
                <TextField
                    className={localStyles.dialog__text_field} margin="normal"
                    label="Permission name" type={"text"} fullWidth variant="standard"
                    defaultValue={props.editedPermission && props.editedPermission.title}
                    onChange={onFieldChange} error={isErrorInput}
                    helperText={isErrorInput && 'Permission name cannot be empty'}
                />
            </DialogContent>

            <DialogActions className={globalStyles.dialog__actions}>
                <Button onClick={() => props.setOpenPermissionFormModal(false)}>Cancel</Button>
                <Button onClick={onSaveButtonClick} disabled={isErrorInput}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

const mapStateToProps = (state: AppState) => (
    {
        isOpen: state.permissions.isFormModalOpen,
        editedPermission: state.permissions.editedPermission
    }
)

const mapDispatchToProps = {
    setOpenPermissionFormModal,
    saveOrUpdatePermission
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(PermissionsFormModal);
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import React from "react";
import globalStyles from '../../global-styles/ModalWindow.module.css'
import localStyles from './PermissionsFormModal.module.css'
import {AppState} from "../../../index";
import {connect, ConnectedProps} from "react-redux";
import {saveOrUpdatePermission, setOpenPermissionFormModal} from "../../../redux/permissions/permissionsActions";
import {Form, Formik} from "formik";
import * as yup from "yup";
import {Permission} from "../../../model/Permission";

const validationSchema = yup.object().shape({
    title: yup.string().required('Permission title cannot be empty').min(3, 'Permission name should be > 3')
})

const PermissionsFormModal: React.FC<Props> = (props) => {

    return (
        <Dialog open={props.isOpen} fullWidth>
            <DialogTitle className={globalStyles.dialog__title}>Permission Form</DialogTitle>

            <Formik
                initialValues={{title: props.editedPermission?.title}}
                onSubmit={(values) => props.saveOrUpdatePermission(new Permission(props.editedPermission?.id, values.title))}
                validationSchema={validationSchema}
            >
                {formik => (
                    <Form>

                        <DialogContent className={globalStyles.dialog__content}>
                            <TextField
                                className={localStyles.dialog__text_field} margin="normal"
                                label="Permission name" type={"text"} fullWidth variant="standard"
                                defaultValue={formik.values.title} error={!!formik.errors.title}
                                onChange={(event) => formik.setFieldValue('title', event.target.value)}
                                helperText={formik.errors.title}
                            />
                        </DialogContent>

                        <DialogActions className={globalStyles.dialog__actions}>
                            <Button onClick={() => props.setOpenPermissionFormModal(false)}>Cancel</Button>
                            <Button type={"submit"} disabled={!formik.isValid}>Save</Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
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
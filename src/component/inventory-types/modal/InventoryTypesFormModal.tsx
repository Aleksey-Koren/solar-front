import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../../../index";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import globalStyles from "../../global-styles/ModalWindow.module.css";
import {Form, Formik} from "formik";
import {
    deleteInventoryTypeTF,
    saveOrUpdateInventoryTypeTF,
    setIsInventoryTypeEditFormOpen
} from "../../../redux/inventory-type/inventoryTypesActions";
import {InventoryType} from "../../../model/inventory/inventoryType";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    title: yup.string().required('Inventory type title cannot be empty').min(3, 'Inventory type title length should be > 3')
})

const InventoryTypesFormModal: React.FC<Props> = (props) => {

    return (
        <Dialog open={props.isOpen} fullWidth>
            <DialogTitle className={globalStyles.dialog__title}>Inventory Type Form</DialogTitle>

            <Formik
                initialValues={{title: props.editedInventoryType?.title}}
                onSubmit={(values) => props.saveOrUpdateInventoryTypeTF(new InventoryType(props.editedInventoryType?.id, values.title))}
                validationSchema={validationSchema}
                validateOnMount
            >
                {formik => (
                    <Form>

                        <DialogContent className={globalStyles.dialog__content}>
                            <TextField
                                className={globalStyles.dialog__text_field} margin="normal"
                                label="Inventory type name" type={"text"} fullWidth variant="standard"
                                defaultValue={formik.values.title} error={!!formik.errors.title}
                                onChange={(event) => formik.setFieldValue('title', event.target.value)}
                                helperText={formik.errors.title}
                            />
                        </DialogContent>

                        <DialogActions className={globalStyles.dialog__actions}>
                            <Button onClick={() => props.setIsInventoryTypeEditFormOpen(false)}>Cancel</Button>
                            <Button type={"submit"} disabled={!formik.isValid}>Save</Button>
                            {props.editedInventoryType
                                && <Button
                                    onClick={() => props.deleteInventoryTypeTF(props.editedInventoryType?.id)}>Delete</Button>
                            }
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
}

const mapStateToProps = (state: AppState) => ({
    isOpen: state.inventoryTypes.isInventoryTypeEditFormOpen,
    editedInventoryType: state.inventoryTypes.editedInventoryType,
})

const mapDispatchToProps = {
    saveOrUpdateInventoryTypeTF,
    setIsInventoryTypeEditFormOpen,
    deleteInventoryTypeTF
}

const connector = connect(mapStateToProps, mapDispatchToProps)

type Props = ConnectedProps<typeof connector>

export default connector(InventoryTypesFormModal)
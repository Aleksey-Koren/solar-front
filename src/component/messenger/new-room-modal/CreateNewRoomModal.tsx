import * as yup from "yup";
import {useAppDispatch, useAppSelector} from "../../../index";
import {
    createNewPublicRoomTF,
    setEditTitleOpen,
    setIsNewRoomModalOpened,
    updateRoomTitle
} from "../../../redux/messenger/messengerActions";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import style from "../../global-styles/ModalWindow.module.css";
import {Form, Formik} from "formik";

const validationSchema = yup.object().shape({
    title: yup.string().required('Room title cannot be empty').min(3)
})

function CreateNewRoomModal() {
    const isOpen = useAppSelector(state => state.messenger.isNewRoomModalOpened);
    const dispatch = useAppDispatch();

    const onClose = () => dispatch(setIsNewRoomModalOpened(false));

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth={"sm"} fullWidth>
            <DialogTitle className={style.dialog__title}>Enter room title</DialogTitle>
            <Formik
                initialValues={{title: ''}}
                onSubmit={(values) => {
                    dispatch(createNewPublicRoomTF(values.title))
                    onClose();
                }}
                validationSchema={validationSchema}
            >
                {formik => (
                    <Form >
                        <DialogContent className={style.dialog__content}>
                            <TextField
                                className={style.dialog__text_field}
                                autoFocus margin="dense" type="text"
                                defaultValue={formik.values.title}
                                onChange={(event) => formik.setFieldValue('title', event.target.value)}
                                error={!!formik.errors.title} helperText={formik.errors.title}
                                fullWidth variant="standard" placeholder={"Room title"}
                            />
                        </DialogContent>
                        <DialogActions className={style.dialog__actions}>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type={"submit"} disabled={!formik.isValid}>Create</Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
}

export default CreateNewRoomModal;
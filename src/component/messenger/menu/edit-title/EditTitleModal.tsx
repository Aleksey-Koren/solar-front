import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../index";
import {setEditTitleOpen, updateRoomTitle} from "../../../../redux/messenger/messengerActions";
import style from "../../../global-styles/ModalWindow.module.css";
import {Form, Formik} from "formik";
import * as yup from "yup";
import {Room} from "../../../../model/messenger/room/Room";

interface EditTitleModalProps {
    selectedRoom: Room
}

const validationSchema = yup.object().shape({
    title: yup.string().required('Room title cannot be empty').min(3, )
})


function EditTitleModal(props: EditTitleModalProps) {
    const isOpen = useAppSelector(state => state.messenger.isEditTitleModalOpen);
    const dispatch = useAppDispatch();

    const onCloseModal = () => dispatch(setEditTitleOpen(false));

    return (
        <Dialog open={isOpen} onClose={onCloseModal} maxWidth={"sm"} fullWidth>
            <DialogTitle className={style.dialog__title}>Enter room title</DialogTitle>
            <Formik
                initialValues={{title: props.selectedRoom?.title}}
                onSubmit={(values) => {dispatch(updateRoomTitle(props.selectedRoom?.id, values.title))}}
                validationSchema={validationSchema}
            >
                {formik => (
                    <Form>
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
                            <Button onClick={onCloseModal}>Cancel</Button>
                            <Button type={"submit"} disabled={!formik.isValid}>Save</Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
}

export default EditTitleModal;
import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, Tooltip} from "@mui/material";
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../../../index";
import style from './UserFormModal.module.css'
import {fetchAllPermissions} from "../../../service/permissionService";
import {Permission} from "../../../model/Permission";
import Select from 'react-select'
import {closeEditForm, removeUser, updateUser} from "../../../redux/users/usersActions";
import {DropdownOption} from "../../../model/planet/DropdownOption";
import {findAllPlanetsNamesForDropdown} from "../../../service/planetService";
import {Field, Form, Formik} from "formik";
import {User} from "../../../model/User";
import {userFormInitValues, userValidationSchema} from "./formik-config/formikConfig";
import UserFormAppBar from "./UserFormAppBar";

const UserFormModal: React.FC<Props> = (props) => {
    const [permissionsDropdown, setPermissionsDropdown] = useState<Permission[]>([]);
    const [locations, setLocations] = useState<DropdownOption[]>([]);

    useEffect(() => {
        fetchAllPermissions().then(permissionsResp => {
            setPermissionsDropdown(permissionsResp.data)
            findAllPlanetsNamesForDropdown().then(locationsResp => setLocations(locationsResp.data))
        });
    }, [])


    return (
        <Dialog open={props.isEditFormOpen} fullWidth maxWidth={'md'}>

            <UserFormAppBar/>

            <Formik
                initialValues={userFormInitValues(props.editedUser)}
                onSubmit={(values) => props.updateUser(values as User)}
                validationSchema={userValidationSchema}
                validateOnChange
            >
                {formik => (
                    <Form>
                        <div className={style.dialog__content}>
                            <table>
                                <tbody>
                                <tr>
                                    <td className={style.dialog__label}>Title</td>
                                    <td>
                                        <Tooltip
                                            title={formik.errors.title ? `${formik.errors.title}` : ''}
                                            open={!!formik.errors.title && !!formik.touched.title}
                                            placement={"top"} arrow>
                                            <div>
                                                <Field name={"title"} type={"text"}
                                                       className={style.dialog__input_field}/>
                                            </div>
                                        </Tooltip>
                                    </td>

                                    <td className={style.dialog__label}>Money</td>
                                    <td>
                                        <Tooltip
                                            title={formik.errors.money ? `${formik.errors.money}` : ''}
                                            open={!!formik.errors.money && !!formik.touched.money}
                                            placement={"top"} arrow>
                                            <div>
                                                <Field name={"money"} type={"number"}
                                                       className={style.dialog__input_field}/>
                                            </div>
                                        </Tooltip>
                                    </td>
                                </tr>

                                <tr>
                                    <td className={style.dialog__label}>Permissions</td>
                                    <td>
                                        <Select
                                            className={style.dialog__select_field}
                                            styles={{control: (base, state) => ({...base, borderRadius: '20px'})}}
                                            closeMenuOnSelect={false}
                                            isMulti
                                            maxMenuHeight={200}
                                            menuPlacement={'top'}
                                            options={permissionsDropdown}
                                            defaultValue={props.editedUser?.permissions}
                                            getOptionLabel={(option) => option.title}
                                            getOptionValue={(option) => option.id.toString()}
                                            onChange={(selectedOptions) => {
                                                formik.values.permissions = [...selectedOptions]
                                            }}
                                        />
                                    </td>

                                    <td className={style.dialog__label}>Location</td>
                                    <td>
                                        <Tooltip
                                            title={formik.errors.locationId ? `${formik.errors.locationId}` : ''}
                                            open={!!formik.errors.locationId && !!formik.touched.locationId}
                                            placement={"top"} arrow>
                                            <div>
                                                <Field component={"select"} name={"locationId"}
                                                       className={style.dialog__select_field}>
                                                    {
                                                        locations.map((location, index) =>
                                                            <option key={index} value={location.value}>
                                                                {location.label}
                                                            </option>
                                                        )
                                                    }
                                                </Field>
                                            </div>
                                        </Tooltip>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                        <DialogActions className={style.dialog__actions}>
                            <Button onClick={() => props.removeUser(props.editedUser?.id)}>Delete</Button>
                            <Button type={"submit"} disabled={formik.dirty}>Save</Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
}

const mapStateToProps = (state: AppState) => ({
    isEditFormOpen: state.users.isEditFormOpen,
    editedUser: state.users.editedUser
})

const mapDispatchToProps = {
    closeEditForm,
    removeUser,
    updateUser
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>

export default connector(UserFormModal);
import styles from './RegistrationStyles.module.css'
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import KeySharpIcon from '@mui/icons-material/KeySharp';
import LockResetIcon from '@mui/icons-material/LockReset';
import {Field, Form, Formik} from 'formik';
import * as yup from 'yup'
import {Tooltip} from "@mui/material";
import {register} from "../../service/authService";
import {User} from "../../model/User";
import {Builder} from "builder-pattern";
import {Dispatch, SetStateAction, useState} from "react";
import ErrorPopup from "../error-popup/ErrorPopup";
import {connectStompClient} from "../../http/webSocket";
import {AppDispatch, useAppDispatch} from "../../index";
import {messengerInitialization} from "../../redux/messenger/messengerActions";

const validationSchema = yup.object().shape({
    login: yup.string().required('Login\\email cannot be empty').min(3),
    password: yup.string().required('Password cannot be empty').min(3),
    repeatPassword: yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required('Please, repeat password')
})

function Registration() {
    let navigate = useNavigate();
    const [error, setError] = useState<string>();
    const dispatch = useAppDispatch();

    return (
        <div className={styles.container}>
            <Formik
                initialValues={{login: '', password: '', repeatPassword: ''}}
                onSubmit={(values) => onSubmitButtonClick(values, setError, navigate, dispatch)}
                validationSchema={validationSchema}
            >
                {formik => (
                    <Form>
                        <div className={styles.form}>
                            <div className={styles.form__header}>
                                <h1>Registration</h1>
                            </div>
                            <div className={styles.form__fields}>
                                <div className={styles.form__input}>
                                    <Tooltip
                                        title={'You may use email address or any other unique name. We have no email verification.\n' +
                                            'However, restore access to account only possible if we know your email'}
                                        placement={"top"}>
                                        <div className={styles.icon}>
                                            <AccountCircleRoundedIcon fontSize={"large"} sx={{color: 'white'}}/>
                                        </div>
                                    </Tooltip>
                                    <Tooltip title={formik.errors.login ? formik.errors.login : ''}
                                             open={!!formik.errors.login && !!formik.touched.login}
                                             placement={"top"} arrow>
                                        <div>
                                            <Field
                                                name={"login"}
                                                type={"text"}
                                                className={styles.input_field}
                                                placeholder={"Login or Email"}
                                            />
                                        </div>
                                    </Tooltip>
                                </div>
                                <div className={styles.form__input}>
                                    <div className={styles.icon}>
                                        <KeySharpIcon fontSize={"large"} sx={{color: 'white'}}/>
                                    </div>
                                    <Tooltip title={formik.errors.password ? formik.errors.password : ''}
                                             open={!!formik.errors.password && !!formik.touched.password}
                                             placement={"top"} arrow>
                                        <div>
                                            <Field
                                                name={"password"}
                                                type="password"
                                                className={styles.input_field}
                                                placeholder={"Password"}
                                            />
                                        </div>
                                    </Tooltip>
                                </div>

                                <div className={styles.form__input}>
                                    <div className={styles.icon}>
                                        <LockResetIcon fontSize={"large"} sx={{color: 'white'}}/>
                                    </div>
                                    <Tooltip title={formik.errors.repeatPassword ? formik.errors.repeatPassword : ''}
                                             open={!!formik.errors.repeatPassword && !!formik.touched.repeatPassword}
                                             placement={"top"} arrow>
                                        <div>
                                            <Field
                                                name={"repeatPassword"}
                                                type="password"
                                                className={styles.input_field}
                                                placeholder={"Repeat password"}
                                            />
                                        </div>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className={styles.form__button}>
                                <button className={styles.submit_button} type={"submit"} disabled={!formik.isValid}>Register
                                </button>
                            </div>
                            <div className={styles.form__footer}>
                                <div className={styles.footer_text}>
                                    <p>Already have account?
                                        <Link to="/login"> Sign in</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <ErrorPopup errorMessage={error} isError={error != null} autoHideDuration={5000}
                                    handlePopupClose={() => setError(null)}/>
                    </Form>
                )}
            </Formik>
        </div>
    )
}


function onSubmitButtonClick(formValues: any,
                             setError: Dispatch<SetStateAction<string>>,
                             navigate: NavigateFunction,
                             dispatch: AppDispatch) {
    let user = Builder(User)
        .login(formValues.login)
        .password(formValues.password)
        .build();

    register(user).then(response => {
        if (response.data.error) {
            setError(response.data.error);
        } else {
            sessionStorage.setItem('auth_token', response.data.token)
            dispatch(messengerInitialization());
            navigate('/')
        }
    }).catch(error => {
        setError('Server error')
    })
}

export default Registration;
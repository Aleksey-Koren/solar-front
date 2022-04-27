import {Form, Formik, FormikHelpers, Field} from 'formik';
import {Builder} from "builder-pattern";
import {AxiosResponse} from "axios";
import {login} from "../../service/authService";
import * as Yup from 'yup';
import {User} from "../../model/User";
import {Token} from "../../model/Token";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import ErrorPopup from "../error-popup/ErrorPopup";
import {Tooltip} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import KeySharpIcon from "@mui/icons-material/KeySharp";
import styles from './loginForm.module.css'

interface IFormikValues {
    login: string;
    password: string;
}

enum LoginStatus {
    REFRESHED = "REFRESHED",
    VALID_CREDENTIALS = "VALID_CREDENTIALS",
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    BLOCKED = "BLOCKED"
}

interface IState {
    status: LoginStatus;
    blockDuration?: string;
    errorText?: string;
}

const LoginForm: React.FC = () => {

    const [state, setState] = useState<IState>({status: LoginStatus.REFRESHED});
    const navigate = useNavigate();



    const onSubmit = (values: IFormikValues, actions: FormikHelpers<IFormikValues>) => {

        const user: User = Builder(User)
            .login(values.login)
            .password(values.password)
            .build();

        login(user).then(resp => {
            switch (resp.data.status) {
                case LoginStatus.VALID_CREDENTIALS:
                    sessionStorage.setItem('auth_token', resp.data.data);
                    navigate('/');
                    break;
                case LoginStatus.INVALID_CREDENTIALS:
                    setState({status: LoginStatus.INVALID_CREDENTIALS, errorText: "Invalid login or password"});
                    actions.resetForm();
                    break;
                case LoginStatus.BLOCKED:
                    generateBlockedTimer(resp, setState, state);
                    actions.resetForm();
                    break;
            }
        });
    }

    return (
    <div className={styles.login_container}>
        <Formik
            initialValues={{login: '', password: ''}}
            validationSchema={
                Yup.object({
                    login: Yup.string().min(3, 'Have to b e at least 3 characters length').required('Required'),
                    password: Yup.string().min(3, 'Have to be at least 3 characters length').required('Required')
                })
            }
            onSubmit={onSubmit}
        >
            {formik => (
                <Form>
                    <div className={styles.login_form}>
                        <div className={styles.login_form__header}>
                            <h1>Signing In</h1>
                        </div>
                        <div className={styles.login_form__fields}>
                            <div className={styles.login_form__input}>
                                <div className={styles.login_icon}>
                                    <AccountCircleRoundedIcon fontSize={"large"} sx={{color: 'white'}}/>
                                </div>
                                <Tooltip title={formik.errors.login ? formik.errors.login : ''}
                                         open={formik.errors.login !== undefined && formik.touched.login === true}
                                         placement={"top"} arrow>
                                    <div>
                                        <Field className={styles.login_input_field} name="login" type="text" placeholder={"Login/email"} />
                                    </div>
                                </Tooltip>
                            </div>
                            <div className={styles.login_form__input}>
                                <div className={styles.login_icon}>
                                    <KeySharpIcon fontSize={"large"} sx={{color: 'white'}}/>
                                </div>
                                <Tooltip title={formik.errors.password ? formik.errors.password : ''}
                                         open={formik.errors.password !== undefined && formik.touched.password === true}
                                         placement={"top"} arrow>
                                    <div>
                                        <Field className={styles.login_input_field} name="password" type="password" placeholder={"Password"}/>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                        <div className={styles.login_footer_block}>
                            {state.blockDuration !== undefined
                                ?
                                <div>
                                    <strong className={styles.login_blocked_text}>{'Account is blocked for:  ' + state.blockDuration}</strong>
                                </div>
                                : null}
                            <div className={styles.login_form__button}>
                                <button className={styles.login_submit_button} type="submit">Submit</button>
                            </div>
                            <div className={styles.login_form__footer}>
                                <p className={styles.login_footer_text}>Don't have an account?
                                    <Link className={styles.login_link_text} to={"/registration"}>  Register</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
        <ErrorPopup errorMessage={state.errorText} isError={state.errorText !== undefined} autoHideDuration={5000}
                    handlePopupClose={() => setState({...state, errorText: undefined})}/>
    </div>

    )
}

const generateBlockedTimer = (resp: AxiosResponse<Token>, setState: (state: IState) => void, state: IState) => {
    let durationInSeconds = (resp.data.blockedInMills / 1000);
    let id = setInterval(() => {
        let date = new Date(0);
        date.setSeconds(durationInSeconds);
        let timeString = date.toISOString().substring(11, 19);
        setState({status: LoginStatus.BLOCKED, blockDuration: timeString});
        durationInSeconds = --durationInSeconds;
        if (durationInSeconds <= 0) {
            clearInterval(id);
            setState({...state, blockDuration: undefined})
        }
    }, 1000)
}

export default LoginForm;
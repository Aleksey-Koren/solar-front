import './RegistrationStyles.css'
import {Link, NavigateFunction, useNavigate} from "react-router-dom";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import KeySharpIcon from '@mui/icons-material/KeySharp';
import LockResetIcon from '@mui/icons-material/LockReset';
import {Field, Form, Formik, useFormik} from 'formik';
import * as yup from 'yup'
import {Tooltip} from "@mui/material";
import {register} from "../../service/authService";
import {User} from "../../model/User";
import {Builder} from "builder-pattern";
import {Dispatch, SetStateAction, useState} from "react";
import ErrorPopup from "../error-popup/ErrorPopup";

const validationSchema = yup.object().shape({
    login: yup.string().required('Login\\email cannot be empty').min(3),
    password: yup.string().required('Password cannot be empty').min(3),
    repeatPassword: yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required('Please, repeat password')
})

function Registration() {
    let navigate = useNavigate();
    const [error, setError] = useState<string>();

    return (
        <div className="container">
            <Formik
                initialValues={{login: '', password: '', repeatPassword: ''}}
                onSubmit={(values) => onSubmitButtonClick(values, setError, navigate)}
                validationSchema={validationSchema}
            >
                {formik => (
                    <Form>
                        <div className="form">
                            <div className="form__header">
                                <h1>Registration</h1>
                            </div>
                            <div className="form__fields">
                                <div className="form__input ">
                                    <Tooltip
                                        title={'You may use email address or any other unique name. We have no email verification.\n' +
                                            'However, restore access to account only possible if we know your email'}
                                        placement={"top"}>
                                        <div className="icon">
                                            <AccountCircleRoundedIcon fontSize={"large"} sx={{color: 'white'}}/>
                                        </div>
                                    </Tooltip>
                                    <Tooltip title={formik.errors.login ? formik.errors.login : ''}
                                             open={formik.errors.login !== undefined && formik.touched.login}
                                             placement={"top"} arrow>
                                        <div>
                                            <Field
                                                name={"login"}
                                                type={"text"}
                                                className="input_field"
                                                placeholder={"Login or Email"}
                                            />
                                        </div>
                                    </Tooltip>
                                </div>
                                <div className="form__input">
                                    <div className="icon">
                                        <KeySharpIcon fontSize={"large"} sx={{color: 'white'}}/>
                                    </div>
                                    <Tooltip title={formik.errors.password ? formik.errors.password : ''}
                                             open={formik.errors.password !== undefined && formik.touched.password}
                                             placement={"top"} arrow>
                                        <div>
                                            <Field
                                                name={"password"}
                                                type="password"
                                                className="input_field"
                                                placeholder={"Password"}
                                            />
                                        </div>
                                    </Tooltip>
                                </div>

                                <div className="form__input">
                                    <div className="icon">
                                        <LockResetIcon fontSize={"large"} sx={{color: 'white'}}/>
                                    </div>
                                    <Tooltip title={formik.errors.repeatPassword ? formik.errors.repeatPassword : ''}
                                             open={formik.errors.repeatPassword !== undefined && formik.touched.repeatPassword}
                                             placement={"top"} arrow>
                                        <div>
                                            <Field
                                                name={"repeatPassword"}
                                                type="password"
                                                className="input_field"
                                                placeholder={"Repeat password"}
                                            />
                                        </div>
                                    </Tooltip>
                                </div>

                            </div>
                            <div className="form__button">
                                <button className="submit_button" type={"submit"} disabled={!formik.isValid}>Register
                                </button>
                            </div>
                            <div className="form__footer">
                                <div className="footer_text">
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


function onSubmitButtonClick(formValues: any, setError: Dispatch<SetStateAction<string>>, navigate: NavigateFunction) {
    let user = Builder(User)
        .login(formValues.login)
        .password(formValues.password)
        .build();

    register(user).then(response => {
        if (response.data.error) {
            setError(response.data.error);
        } else {
            localStorage.setItem('token', response.data.token)
            navigate('/')
        }
    }).catch(error => {
        setError('Server error')
    })
}

export default Registration;
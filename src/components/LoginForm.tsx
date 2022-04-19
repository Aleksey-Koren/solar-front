import {Form, Formik, FormikHelpers, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {User} from "../model/User";
import {Builder} from "builder-pattern";
import {login} from "../service/authService";
import {AxiosResponse} from "axios";
import {Token} from "../model/Token";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

interface FormikValues {
    login: string;
    password: string;
}

enum LoginStatus {
    REFRESHED = "Refreshed",
    VALID_CREDENTIALS = "VALID_CREDENTIALS",
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    BLOCKED = "BLOCKED"
}

interface IState {
    status: LoginStatus;
    blockDuration?: string;
}

const LoginForm: React.FC = () => {

    const [state, setState] = useState<IState>({status: LoginStatus.REFRESHED});
    const navigate = useNavigate();

    const onSubmit = (values: FormikValues, actions: FormikHelpers<FormikValues>) => {

        const user: User = Builder(User)
            .login(values.login)
            .password(values.password)
            .build();

        login(user).then(resp => {
            switch (resp.data.status) {
                case "VALID_CREDENTIALS" :
                    localStorage.setItem('auth_token', resp.data.data);
                    navigate('/');
                    break;
                case "INVALID_CREDENTIALS":
                    setState({status: LoginStatus.INVALID_CREDENTIALS});
                    actions.resetForm();
                    break;
                case "BLOCKED":
                    generateBlockedTimer(resp, setState, state);
                    actions.resetForm();
                    break;
            }
        });
    }

    return (
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
            <Form>
                <label htmlFor="login">First Name</label>
                <Field name="login" type="text"/>
                <ErrorMessage name="login"/>

                <label htmlFor="password">Last Name</label>
                <Field name="password" type="text"/>
                <ErrorMessage name="password"/>

                <button type="submit">Submit</button>
                {state.blockDuration !== undefined ?
                    <div><strong>{'Account is blocked for: ' + state.blockDuration}</strong></div> : null}
                {state.status === LoginStatus.INVALID_CREDENTIALS ?
                    <div><strong>Invalid login or password</strong></div> : null}
            </Form>
        </Formik>
    )
}

const generateBlockedTimer = (resp: AxiosResponse<Token>, setState: (state: IState) => void, state: IState) => {
    let durationInSeconds = (resp.data.blocked / 1000);
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
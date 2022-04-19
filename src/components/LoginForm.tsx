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
    Refreshed,
    InvalidCredentials,
    Blocked
}

interface State {
    status: LoginStatus;
}

const hasToken: (resp: AxiosResponse<Token, any>) => boolean = function(resp) {
    return resp.data.data !== null;
}

const invalidCredentials: (resp: AxiosResponse<Token, any>) => boolean = function(resp) {
    return resp.data.data === null && resp.data.blocked === null;
}
const isBlocked: (resp: AxiosResponse<Token, any>) => boolean = function(resp) {
    return resp.data.data === '' && resp.data.blocked !== null;
}

const LoginForm: React.FC = () => {

    const [state, setState] = useState<State>({status: LoginStatus.Refreshed});
    //from 'react-router' or from 'react-router-dom'?
    const navigate = useNavigate();

    const onSubmit = (values: FormikValues, actions: FormikHelpers<FormikValues>) => {

        const user: User = Builder<User>()
            .login(values.login)
            .password(values.password)
            .build();

        login(user).then(resp => {
            if(hasToken(resp)) {
                localStorage.setItem('auth_token', resp.data.data);
                actions.setSubmitting(false);
                navigate('/')
            } else if (invalidCredentials(resp)) {
                setState({...state, status: LoginStatus.InvalidCredentials});
                actions.resetForm();
            } else if (isBlocked(resp)) {
                setState({...state, status: LoginStatus.Blocked});
                actions.resetForm();
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
                <Field name="login" type="text" />
                <ErrorMessage name="login" />

                <label htmlFor="password">Last Name</label>
                <Field name="password" type="text" />
                <ErrorMessage name="password" />

                <button type="submit">Submit</button>
            </Form>
        </Formik>

    )
}

export default LoginForm;
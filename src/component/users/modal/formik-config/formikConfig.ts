import * as yup from "yup";
import {User} from "../../../../model/User";

export const userValidationSchema = yup.object().shape({
    title: yup.string().required('Title cannot be empty').min(3),
    money: yup.number().required('Please, fill money').min(0),
    locationId: yup.string().required('Please, choose location').nullable()
})

export const userFormInitValues = (user: User) => ({
    id: user?.id,
    title: user?.title,
    login: user?.login,
    email: user?.email,
    password: user?.password,
    money: user?.money,
    locationId: user?.locationId,
    hackBlock: user?.hackBlock,
    hackAttempts: user?.hackAttempts,
    avatar: user?.avatar,
    emailNotifications: user?.emailNotifications,
    permissions: user?.permissions
})
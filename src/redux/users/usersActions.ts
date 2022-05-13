import {deleteUser, findUsersPerPage, saveUser, UserFilter} from "../../service/userService";
import {IPendingAction, IPlainDataAction} from "../redux-types";
import {Page} from "../../model/util/Page";
import {User} from "../../model/User";
import {CLOSE_EDIT_FORM, EDIT_USER, FETCH_USERS, REMOVE_USER_REJECTED, UPDATE_USER_REJECTED} from "./usersTypes";
import {Dispatch} from "redux";

export function findUsers(page: number, size: number, userFilter?: UserFilter): IPendingAction<Page<User>> {

    return {
        type: FETCH_USERS,
        payload: findUsersPerPage(page, size, userFilter)
    }
}

export function saveOrUpdateUser(user: User) {

    return (dispatch: Dispatch) => {

        saveUser(user)
            .then(resp => console.log(resp))
            .catch(err => console.error(err))
    }
}

export function editUser(user: User): IPlainDataAction<User> {

    return {
        type: EDIT_USER,
        payload: user
    }
}

export function closeEditForm() {

    return {
        type: CLOSE_EDIT_FORM
    }
}

export function removeUser(userId: number) {

    return (dispatch: Dispatch) => {

        deleteUser(userId)
            .then(() => dispatch(findUsers(0, 10)))
            .catch(() => dispatch({type: REMOVE_USER_REJECTED}))
    }
}

export function updateUser(user: User) {

    return (dispatch: Dispatch) => {

        saveUser(user)
            .then(() => dispatch(findUsers(0, 10)))
            .catch(() => dispatch({type: UPDATE_USER_REJECTED}))
    }
}
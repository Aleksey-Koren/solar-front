import {findUsersPerPage, saveUser, UserFilter} from "../../service/userService";
import {IPendingAction} from "../redux-types";
import {Page} from "../../model/Page";
import {User} from "../../model/User";
import {FETCH_USERS} from "./usersTypes";
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
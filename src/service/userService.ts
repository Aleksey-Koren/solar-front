import {axiosApi} from "../http/axios";
import {Page} from "../model/util/Page";
import {User} from "../model/User";

export interface UserFilter {
    login: string;
    title: string;
}

export function findUsersPerPage(page: number, size: number, userFilter?: UserFilter) {

    return axiosApi.get<Page<User>>('users', {
        params: {page, size, userFilter: userFilter ? userFilter : null}
    })
}

export function findUserById(userId: number) {

    return axiosApi.get<User>(`users/${userId}`);
}

export function deleteUser(userId: number) {

    return axiosApi.delete(`users/${userId}`);
}

export function saveUser(user: User) {

    return axiosApi.put<User>(`users/${user.id}`, user);
}
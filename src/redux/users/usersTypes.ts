import {ActionType, IDefaultStateField, IPaginationState, REJECTED_POSTFIX} from "../redux-types";
import {User} from "../../model/User";
import {Page} from "../../model/util/Page";

export interface IUsersState {
    users: User[];
    totalPagesAmount: number;
    editedUser: User | null;
    isEditFormOpen: boolean;
}

export type TUsersState = IUsersState & IDefaultStateField & IPaginationState;
export type TUsersAction = ActionType<User> | ActionType<Page<User>>;

export const FETCH_USERS = "FETCH_USERS"
export const EDIT_USER = "EDIT_USER"
export const REMOVE_USER_REJECTED = "REMOVE_USER" + REJECTED_POSTFIX
export const UPDATE_USER_REJECTED = "UPDATE_USER" + REJECTED_POSTFIX
export const CLOSE_EDIT_FORM = "CLOSE_EDIT_FORM"
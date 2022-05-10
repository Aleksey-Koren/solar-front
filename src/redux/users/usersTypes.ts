import {ActionType, IDefaultStateField, IPaginationState} from "../redux-types";
import {User} from "../../model/User";
import {Page} from "../../model/Page";

export interface IUsersState {
    users: User[];
}

export type TUsersState = IUsersState & IDefaultStateField & IPaginationState;
export type TUsersAction = ActionType<User> | ActionType<Page<User>>;

export const FETCH_USERS = "FETCH_USERS"
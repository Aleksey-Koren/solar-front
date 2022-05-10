import {FETCH_USERS, TUsersAction, TUsersState} from "./usersTypes";
import {FULFILLED_POSTFIX, IFulfilledAction} from "../redux-types";
import {User} from "../../model/User";
import {Page} from "../../model/Page";

const initState: TUsersState = ({
    isLoading: false,
    isError: false,
    users: [],
    currentPage: 0,
    itemsPerPage: 5,
    totalItems: 0,
    totalPagesAmount: 0
})

export function usersReducer(state: TUsersState = initState, action: TUsersAction) {
    switch (action.type) {
        case FETCH_USERS + FULFILLED_POSTFIX:
            const fulfilledAction = action as IFulfilledAction<Page<User>>;
            return {...initState,
                users: fulfilledAction.payload.data.content,
                currentPage: fulfilledAction.payload.data.number,
                itemsPerPage: fulfilledAction.payload.data.size,
                totalPlanetsAmount: fulfilledAction.payload.data.totalElements,
                totalPagesAmount: fulfilledAction.payload.data.totalPages
            }
        default:
            return state;
    }
}
import {
    CLOSE_EDIT_FORM,
    EDIT_USER,
    FETCH_USERS,
    REMOVE_USER_REJECTED,
    TUsersAction,
    TUsersState,
    UPDATE_USER_REJECTED
} from "./usersTypes";
import {FULFILLED_POSTFIX, IFulfilledAction, IPlainDataAction, PENDING_POSTFIX, REJECTED_POSTFIX} from "../redux-types";
import {User} from "../../model/User";
import {Page} from "../../model/util/Page";

const initState: TUsersState = ({
    isLoading: false,
    isError: false,
    users: [],
    editedUser: null,
    isEditFormOpen: false,
    currentPage: 0,
    itemsPerPage: 10,
    totalItems: 0,
    totalPagesAmount: 1
})

export function usersReducer(state: TUsersState = initState, action: TUsersAction) {
    switch (action.type) {

        case FETCH_USERS + PENDING_POSTFIX:
            return {...initState, isLoading: true}

        case FETCH_USERS + FULFILLED_POSTFIX:
            const fulfilledAction = action as IFulfilledAction<Page<User>>;
            return {
                ...initState,
                users: fulfilledAction.payload.data.content,
                currentPage: fulfilledAction.payload.data.number,
                itemsPerPage: fulfilledAction.payload.data.size,
                totalItems: fulfilledAction.payload.data.totalElements,
                totalPagesAmount: fulfilledAction.payload.data.totalPages
            }

        case UPDATE_USER_REJECTED:
        case REMOVE_USER_REJECTED:
            return {...state, isError: true}

        case FETCH_USERS + REJECTED_POSTFIX:
            return {...initState, isError: true}

        case EDIT_USER:
            const plainAction = action as IPlainDataAction<User>;
            return {...state, editedUser: plainAction.payload, isEditFormOpen: true}

        case CLOSE_EDIT_FORM:
            return {...state, editedUser: null, isEditFormOpen: false}

        default:
            return state;
    }
}
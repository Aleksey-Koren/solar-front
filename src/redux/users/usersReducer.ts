import {TUsersAction, TUsersState} from "./usersTypes";

const initState: TUsersState = ({
    isLoading: false,
    isError: false,
    users: [],
    currentPage: 0,
    itemsPerPage: 5,
    totalItems: 0
})

export function usersReducer(state: TUsersState = initState, action: TUsersAction) {
    switch (action.type) {
        default:
            return state;
    }
}
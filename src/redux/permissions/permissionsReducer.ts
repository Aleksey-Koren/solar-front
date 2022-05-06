import {
    DELETE_PERMISSIONS_REJECTED,
    EDIT_PERMISSION,
    FIND_PERMISSIONS,
    SAVE_PERMISSION_REJECTED,
    SET_OPEN_PERMISSION_FORM_MODAL,
    TPermissionsAction,
    TPermissionsState
} from "./permissionsTypes";
import {Permission} from "../../model/Permission";
import {FULFILLED_POSTFIX, IFulfilledAction, IPlainDataAction, PENDING_POSTFIX, REJECTED_POSTFIX} from "../redux-types";

const initState: TPermissionsState = ({
    isLoading: false,
    isError: false,
    permissions: new Array<Permission>(),
    editedPermission: null,
    isFormModalOpen: false
})

export function permissionsReducer(state: TPermissionsState = initState, action: TPermissionsAction) {
    switch (action.type) {

        case FIND_PERMISSIONS + PENDING_POSTFIX:
            return {...state, isLoading: true, isError: false}

        case FIND_PERMISSIONS + FULFILLED_POSTFIX:
            const fulfilledAction = action as IFulfilledAction<Permission[]>;
            return {...initState, permissions: fulfilledAction.payload.data}

        case SAVE_PERMISSION_REJECTED:
        case DELETE_PERMISSIONS_REJECTED:
        case FIND_PERMISSIONS + REJECTED_POSTFIX:
            return {...initState, isError: true}

        case SET_OPEN_PERMISSION_FORM_MODAL:
            const boolPlainAction = action as IPlainDataAction<boolean>;
            return {...state, isFormModalOpen: boolPlainAction.payload, editedPermission: null}

        case EDIT_PERMISSION:
            const permissionPlainAction = action as IPlainDataAction<Permission>;
            return {...state, editedPermission: permissionPlainAction.payload, isFormModalOpen: true}

        default:
            return state;
    }
}
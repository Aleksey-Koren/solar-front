import {
    DELETE_PERMISSIONS_REJECTED,
    EDIT_PERMISSION,
    FIND_PERMISSIONS,
    SAVE_PERMISSION_REJECTED,
    SET_OPEN_PERMISSION_FORM_MODAL
} from "./permissionsTypes";
import {deletePermissions, fetchAllPermissions, savePermission} from "../../service/permissionService";
import {IPendingAction, IPlainDataAction} from "../redux-types";
import {Permission} from "../../model/Permission";
import {Dispatch} from "redux";

export function findAllPermissions(): IPendingAction<Permission[]> {

    return {
        type: FIND_PERMISSIONS,
        payload: fetchAllPermissions()
    }
}

export function setOpenPermissionFormModal(isShow: boolean): IPlainDataAction<boolean> {

    return {
        type: SET_OPEN_PERMISSION_FORM_MODAL,
        payload: isShow
    }
}

export function editPermission(permission: Permission) {

    return {
        type: EDIT_PERMISSION,
        payload: permission
    }
}

export function saveOrUpdatePermission(permission: Permission) {
    console.log('PERMISSION FOR SAVE: ' + permission.id + ' ' + permission.title)

    return (dispatch: Dispatch) => {
        savePermission(permission)
            .then(() => dispatch(findAllPermissions()))
            .catch(() => dispatch({type: SAVE_PERMISSION_REJECTED}))
    }
}

export function deleteSelectedPermissions(permissionsIds: number[]) {
    console.log("PERMISSIONS ID'S FOR DELETE: " + permissionsIds);

    return (dispatch: Dispatch) => {
        deletePermissions(permissionsIds)
            .then(() => dispatch(findAllPermissions()))
            .catch(() => dispatch({type: DELETE_PERMISSIONS_REJECTED}))
    }

}
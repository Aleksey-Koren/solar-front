import {ActionType, IDefaultStateField, REJECTED_POSTFIX} from "../redux-types";
import {Permission} from "../../model/Permission";

export interface IPermissionsState {
    permissions: Permission[];
    editedPermission: Permission | null;
    isFormModalOpen: boolean;
}

export type TPermissionsState = IPermissionsState & IDefaultStateField;

export type TPermissionsAction = ActionType<Permission> | ActionType<Permission[]>;

export const FIND_PERMISSIONS = 'FIND_PERMISSIONS';
export const SET_OPEN_PERMISSION_FORM_MODAL = 'SET_OPEN_PERMISSION_FORM_MODAL';
export const EDIT_PERMISSION = 'EDIT_PERMISSION';
export const SAVE_PERMISSION_REJECTED = 'SAVE_PERMISSION' + REJECTED_POSTFIX;
export const DELETE_PERMISSIONS_REJECTED = 'DELETE_PERMISSIONS' + REJECTED_POSTFIX;
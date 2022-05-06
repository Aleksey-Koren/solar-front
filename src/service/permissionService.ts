import {axiosApi} from "../http/axios";
import {Permission} from "../model/Permission";

export function fetchAllPermissions() {

    return axiosApi.get<Permission[]>('permissions');
}

export function savePermission(permission: Permission) {

    return axiosApi.post('permissions', permission);
}

export function deletePermissions(permissionsIds: number[]) {

    return axiosApi.delete('/permissions', {data: permissionsIds});
}
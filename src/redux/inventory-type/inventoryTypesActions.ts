import {IPendingAction, IPlainDataAction, REJECTED_POSTFIX} from "../redux-types";
import {Page} from "../../model/util/Page";
import {InventoryType} from "../../model/inventory/inventoryType";
import {
    DELETE_INVENTORY_TYPE,
    FETCH_INVENTORY_TYPES,
    SET_IS_INVENTORY_TYPE_EDIT_FORM_OPEN,
    UPDATE_INVENTORY_TYPE
} from "./inventoryTypesConsts";
import {InventoryTypeService} from "../../service/inventory/inventoryTypeService";
import {AppDispatch} from "../../index";

export function fetchInventoryTypes(page: number, size: number): IPendingAction<Page<InventoryType>> {

    return {
        type: FETCH_INVENTORY_TYPES,
        payload: InventoryTypeService.findAll(page, size)
    }
}

export function setIsInventoryTypeEditFormOpen(isOpen: boolean): IPlainDataAction<boolean> {

    return {
        type: SET_IS_INVENTORY_TYPE_EDIT_FORM_OPEN,
        payload: isOpen
    }
}

export function saveOrUpdateInventoryTypeTF(inventoryType: InventoryType) {

    return (dispatch: AppDispatch) => {

        InventoryTypeService.save(inventoryType)
            .then(() => dispatch(fetchInventoryTypes(0, 10)))
            .catch(() => dispatch(UPDATE_INVENTORY_TYPE + REJECTED_POSTFIX));
    }
}


export function deleteInventoryTypeTF(inventoryTypeId: number) {

    return (dispatch: AppDispatch) => {

        InventoryTypeService.delete(inventoryTypeId)
            .then(() => dispatch(fetchInventoryTypes(0, 10)))
            .catch(() => dispatch(DELETE_INVENTORY_TYPE + REJECTED_POSTFIX))
    }
}

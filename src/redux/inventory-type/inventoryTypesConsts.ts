import {InventoryType} from "../../model/inventory/inventoryType";
import {ActionType, IDefaultStateField, IPaginationState, IPlainDataAction, REJECTED_POSTFIX} from "../redux-types";
import {Page} from "../../model/util/Page";

interface InventoryTypeState {
    inventoryTypes: InventoryType[];
    editedInventoryType: InventoryType | null;
    isInventoryTypeEditFormOpen: boolean;
}

export type TInventoryTypeState = InventoryTypeState & IDefaultStateField & IPaginationState;

export type TInventoryTypeAction =
    ActionType<InventoryType>
    | ActionType<Page<InventoryType>>
    | IPlainDataAction<boolean>
    | IPlainDataAction<InventoryType>;

export const FETCH_INVENTORY_TYPES = 'FETCH_INVENTORY_TYPES'
export const UPDATE_INVENTORY_TYPE_REJECTED = 'UPDATE_INVENTORY_TYPE' + REJECTED_POSTFIX
export const DELETE_INVENTORY_TYPE_REJECTED = 'DELETE_INVENTORY_TYPE' + REJECTED_POSTFIX
export const EDIT_INVENTORY_TYPE = 'EDIT_INVENTORY_TYPE'
export const SET_IS_INVENTORY_TYPE_EDIT_FORM_OPEN = 'SET_IS_INVENTORY_TYPE_EDIT_FORM_OPEN'

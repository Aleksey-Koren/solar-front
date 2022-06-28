import {InventoryType} from "../../model/inventory/inventoryType";
import {ActionType, IDefaultStateField, IPaginationState, IPlainDataAction} from "../redux-types";
import {Page} from "../../model/util/Page";

interface InventoryTypeState {
    inventoryTypes: InventoryType[];
    editedInventoryType: InventoryType | null;
    isInventoryTypeEditFormOpen: boolean;
}

export type TInventoryTypeState = InventoryTypeState & IDefaultStateField & IPaginationState;

export type TInventoryTypeAction = ActionType<InventoryType> | ActionType<Page<InventoryType>> | IPlainDataAction<boolean>;

export const FETCH_INVENTORY_TYPES = 'FETCH_INVENTORY_TYPES'
export const UPDATE_INVENTORY_TYPE = 'UPDATE_INVENTORY_TYPE'
export const DELETE_INVENTORY_TYPE = 'DELETE_INVENTORY_TYPE'
export const SET_IS_INVENTORY_TYPE_EDIT_FORM_OPEN = 'SET_IS_INVENTORY_TYPE_EDIT_FORM_OPEN'

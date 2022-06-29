import {
    DELETE_INVENTORY_TYPE_REJECTED,
    EDIT_INVENTORY_TYPE,
    FETCH_INVENTORY_TYPES,
    SET_IS_INVENTORY_TYPE_EDIT_FORM_OPEN,
    TInventoryTypeAction,
    TInventoryTypeState,
    UPDATE_INVENTORY_TYPE_REJECTED
} from "./inventoryTypesConsts";
import {FULFILLED_POSTFIX, IFulfilledAction, IPlainDataAction, PENDING_POSTFIX, REJECTED_POSTFIX} from "../redux-types";
import {Page} from "../../model/util/Page";
import {InventoryType} from "../../model/inventory/inventoryType";

const initState: TInventoryTypeState = ({
    isLoading: false,
    isError: false,
    isInventoryTypeEditFormOpen: false,
    inventoryTypes: [],
    editedInventoryType: null,
    currentPage: 0,
    itemsPerPage: 10,
    totalItems: 10,
    totalPagesAmount: 1
})

export function inventoryTypesReducer(state: TInventoryTypeState = initState, action: TInventoryTypeAction) {

    switch (action.type) {

        case FETCH_INVENTORY_TYPES + PENDING_POSTFIX:
            return {...initState, isLoading: true};

        case FETCH_INVENTORY_TYPES + FULFILLED_POSTFIX:
            const fulfilledAction = action as IFulfilledAction<Page<InventoryType>>;
            return {
                ...initState,
                inventoryTypes: fulfilledAction.payload.data.content,
                currentPage: fulfilledAction.payload.data.number,
                itemsPerPage: fulfilledAction.payload.data.size,
                totalItems: fulfilledAction.payload.data.totalElements,
                totalPagesAmount: fulfilledAction.payload.data.totalPages
            };

        case FETCH_INVENTORY_TYPES + REJECTED_POSTFIX:
        case UPDATE_INVENTORY_TYPE_REJECTED:
        case DELETE_INVENTORY_TYPE_REJECTED:
            return {...state, isError: true, isLoading: false};

        case SET_IS_INVENTORY_TYPE_EDIT_FORM_OPEN:
            const booleanAction = action as IPlainDataAction<boolean>
            return {...state, isInventoryTypeEditFormOpen: booleanAction.payload, editedInventoryType: null};

        case EDIT_INVENTORY_TYPE:
            const inventoryTypeAction = action as IPlainDataAction<InventoryType>;
            return {...state, editedInventoryType: inventoryTypeAction.payload, isInventoryTypeEditFormOpen: true}

        default:
            return state;
    }
}
import {TInventoryTypeAction, TInventoryTypeState} from "./inventoryTypesConsts";

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


        default:
            return state;
    }
}
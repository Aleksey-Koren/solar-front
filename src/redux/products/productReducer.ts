import {Product} from "../../model/product/Product";
import {IFetchProductsAct, IProductAct, TProductActions} from "./productActions";
import {AxiosResponse} from "axios";
import {Page} from "../../model/Page";
import {
    FETCH_PRODUCTS_FULFILLED,
    FETCH_PRODUCTS_PENDING,
    FETCH_PRODUCTS_REJECTED, GO_TO_CREATE,
    GO_TO_EDIT,
    TProductsState
} from "./productsTypes";

export const initialState = ({
    isLoading: false,
    isError: false,
    isDisplayingTable: false,
    isEditing: false,
    isCreating: false,
    products: new Array<Product>(),
    productId: 0,
    currentPage: 0,
    itemsPerPage: 10,
    totalItems: 0
})

export function productReducer(state:TProductsState = initialState, action: TProductActions): TProductsState {
    switch (action.type) {

        case FETCH_PRODUCTS_PENDING:
            return {...initialState, isLoading: true};

        case FETCH_PRODUCTS_FULFILLED:
            let fetchProductsAction = action as IFetchProductsAct;
            let payload = fetchProductsAction.payload as AxiosResponse<Page<Product>>;
            return {
                ...initialState,
                isDisplayingTable: true,
                products: payload.data.content,
                currentPage: payload.data.number,
                itemsPerPage: payload.data.size,
                totalItems: payload.data.totalElements
            };

            case FETCH_PRODUCTS_REJECTED:
            return {...initialState, isError: true};

        case GO_TO_EDIT:
            let goToEditAction = action as IProductAct
            return {
                ...initialState,
                isEditing: true,
                products: state.products,
                productId: goToEditAction.payload
            }

        case GO_TO_CREATE:
            return {
                ...initialState,
                products: state.products,
                isCreating: true
            }

        default:
            return state;
    }
}
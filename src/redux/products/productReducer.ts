import {Product} from "../../model/product/Product";
import {TProductActions} from "./productActions";
import {AxiosResponse} from "axios";
import {Page} from "../../model/Page";
import {FETCH_PRODUCTS_FULFILLED, FETCH_PRODUCTS_PENDING, FETCH_PRODUCTS_REJECTED, TProductsState} from "./productsTypes";

const initialState = ({
    isLoading: false,
    products: new Array<Product>(),
    isError: false,
    currentPage: 0,
    itemsPerPage: 10,
    totalItems: 0
})

export function productReducer(state:TProductsState = initialState, action: TProductActions): TProductsState {
    switch (action.type) {
        case FETCH_PRODUCTS_PENDING:
            return {...state, isLoading: true, isError: false}
        case FETCH_PRODUCTS_FULFILLED:
            let data: Product[]
            let payload = action.payload as AxiosResponse<Page<Product>>;
            return {
                isLoading: false,
                isError: false,
                products: payload.data.content,
                currentPage: payload.data.number,
                itemsPerPage: payload.data.size,
                totalItems: payload.data.totalElements
            };
        case FETCH_PRODUCTS_REJECTED:
            return {...state, isLoading: false, isError: true};
        default:
            return state;
    }
}
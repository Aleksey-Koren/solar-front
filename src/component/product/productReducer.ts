import {Product} from "../../model/product/Product";
import {TProductActions} from "./productActions";
import {AxiosResponse} from "axios";
import {Page} from "../../model/Page";

export interface IProductsState {
    isPending: boolean;
    products: Product[];
    error: boolean;
}

const initialState = ({
    isPending: false,
    products: new Array<Product>(),
    error: false
})

export function productReducer(state:IProductsState = initialState, action: TProductActions): IProductsState {
    switch (action.type) {
        case "FETCH_PRODUCTS_PENDING":
            return {...state, isPending: true, error: false}
        case "FETCH_PRODUCTS_FULFILLED":
            let data: Product[]
            let payload = action.payload as AxiosResponse<Page<Product>>;
            data = payload.data.content;
            return {isPending: false, error: false, products: data};
        case "FETCH_PRODUCTS_REJECTED":
            return {...state, isPending: false, error: true};
        default:
            return state;
    }
}

export enum FetchProducts {
    PENDING = "FETCH_PRODUCTS_PENDING",
    FULFILLED = "FETCH_PRODUCTS_FULFILLED",
    REJECTED = "FETCH_PRODUCTS_REJECTED"
}
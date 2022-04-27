import {Product} from "../../model/product/Product";
import {Page} from "../../model/Page";
import {AxiosResponse} from "axios";
import {fetchProducts} from "../../service/productService";

export interface IFetchProductsAct {
    type: string;
    payload: Promise<AxiosResponse<Page<Product>>> | AxiosResponse<Page<Product>>
}

export interface IProductAct {
    type: string;
    payload?: number;
}

export type TProductActions = IFetchProductsAct | IProductAct;

export function fetchProductsAction (page: number, size: number): IFetchProductsAct {
    return {
        type: "FETCH_PRODUCTS",
        payload: fetchProducts(page, size)
    }
}

export function goToEditProduct (productId: number): IProductAct {
    return {
        type: "GO_TO_EDIT",
        payload: productId
    }
}
export function goToCreateProduct (): IProductAct {
    return {
        type: "GO_TO_CREATE",
    }
}



import {Product} from "../../model/product/Product";
import {Page} from "../../model/Page";
import {AxiosResponse} from "axios";
import {deleteProduct, fetchProducts, saveProduct, TDeleteResponse} from "../../service/productService";
import {DELETE_PRODUCT, FETCH_PRODUCTS, GO_TO_CREATE, GO_TO_EDIT, SAVE_PRODUCT} from "./productsTypes";

export interface IFetchProductsAct {
    type: string;
    payload: Promise<AxiosResponse<Page<Product>>> | AxiosResponse<Page<Product>>;
}

export interface ISaveProductsAct {
    type: string;
    payload: Promise<AxiosResponse<Product>> | AxiosResponse<Page<Product>>;
}

export interface IDeleteProductsAct {
    type: string;
    payload: Promise<AxiosResponse<TDeleteResponse>> | AxiosResponse<TDeleteResponse>;
}


export interface IProductAct {
    type: string;
    payload?: number;
}

export type TProductActions = IFetchProductsAct | ISaveProductsAct | IDeleteProductsAct | IProductAct;

export function fetchProductsAction(page: number, size: number): IFetchProductsAct {
    return {
        type: FETCH_PRODUCTS,
        payload: fetchProducts(page, size).then()
    }
}

export function saveProductAction(product: Product): ISaveProductsAct {
    return {
        type: SAVE_PRODUCT,
        payload: saveProduct(product)
    }
}

export function deleteProductAction(productId: number): IDeleteProductsAct {
    return {
        type: DELETE_PRODUCT,
        payload: deleteProduct(productId)
    }
}

export function goToEditProductAction(productId: number): IProductAct {
    return {
        type: GO_TO_EDIT,
        payload: productId
    }
}

export function goToCreateProductAction(): IProductAct {
    return {
        type: GO_TO_CREATE
    }
}



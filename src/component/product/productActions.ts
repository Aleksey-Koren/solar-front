import {Product} from "../../model/product/Product";
import {Page} from "../../model/Page";
import {AxiosResponse} from "axios";
import {axiosApi} from "../../http/axios";
import {fetchProducts} from "../../service/productService";

interface IFetchProductsAct {
    type: string;
    payload: Promise<AxiosResponse<Page<Product>>> | AxiosResponse<Page<Product>>
}

export type TProductActions = IFetchProductsAct;

export function fetchProductsAction (page: number, size: number): IFetchProductsAct{
    return {
        type: "FETCH_PRODUCTS",
        payload: fetchProducts(page, size)
    }
}
import {Product} from "../../model/product/Product";
import {Page} from "../../model/Page";
import {AxiosResponse} from "axios";

interface IFetchProductsAct {
    type: string;
    payload: Promise<AxiosResponse<Page<Product>>>;
}

export type TProductActions = IFetchProductsAct;

export function fetchProductsAction
            (payload: (page:number, size: number) =>  Promise<AxiosResponse<Page<Product>>>, page: number, size: number): IFetchProductsAct  {
    return {
        type: "FETCH_PRODUCTS",
        payload: payload(page, size)
    }
}
import {Product} from "../../model/product/Product";
import {IDefaultStateField} from "../planets/planetTypes";

export interface IPaginationState {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
}

export interface IProductsState {
    products: Product[];
}

export type TProductsState = IProductsState & IDefaultStateField & IPaginationState;

export const FETCH_PRODUCTS_PENDING = "FETCH_PRODUCTS_PENDING";
export const FETCH_PRODUCTS_FULFILLED = "FETCH_PRODUCTS_FULFILLED";
export const FETCH_PRODUCTS_REJECTED = "FETCH_PRODUCTS_REJECTED";
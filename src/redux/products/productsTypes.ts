import {Product} from "../../model/product/Product";
import {IDefaultStateField} from "../planets/planetTypes";

export interface IPaginationState {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
}

export interface IProductsState {
    isDisplayingTable: boolean;
    isEditing: boolean;
    isCreating: boolean;

    products: Product[];
    productId: number;
}

export type TProductsState = IProductsState & IDefaultStateField & IPaginationState;

export const FETCH_PRODUCTS_PENDING = "FETCH_PRODUCTS_PENDING";
export const FETCH_PRODUCTS_FULFILLED = "FETCH_PRODUCTS_FULFILLED";
export const FETCH_PRODUCTS_REJECTED = "FETCH_PRODUCTS_REJECTED";
export const GO_TO_EDIT = "GO_TO_EDIT";
export const GO_TO_CREATE = "GO_TO_CREATE";
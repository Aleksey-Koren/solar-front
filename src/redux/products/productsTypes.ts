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
    isProductSaved: boolean;

    products: Product[];
    productId: number;
}

export type TProductsState = IProductsState & IDefaultStateField & IPaginationState;

export const FETCH_PRODUCTS = "FETCH_PRODUCTS"
export const FETCH_PRODUCTS_PENDING = "FETCH_PRODUCTS_PENDING";
export const FETCH_PRODUCTS_FULFILLED = "FETCH_PRODUCTS_FULFILLED";
export const FETCH_PRODUCTS_REJECTED = "FETCH_PRODUCTS_REJECTED";
export const GO_TO_EDIT = "GO_TO_EDIT";
export const GO_TO_CREATE = "GO_TO_CREATE";
export const SAVE_PRODUCT = "SAVE_PRODUCT";
export const SAVE_PRODUCT_PENDING = "SAVE_PRODUCT_PENDING";
export const SAVE_PRODUCT_FULFILLED = "SAVE_PRODUCT_FULFILLED";
export const SAVE_PRODUCT_REJECTED = "SAVE_PRODUCT_REJECTED";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const DELETE_PRODUCT_PENDING = "DELETE_PRODUCT_PENDING";
export const DELETE_PRODUCT_FULFILLED = "DELETE_PRODUCT_FULFILLED";
export const DELETE_PRODUCT_REJECTED = "DELETE_PRODUCT_REJECTED";
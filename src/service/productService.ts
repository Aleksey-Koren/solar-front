import {axiosApi} from "../http/axios";
import {Page} from "../model/util/Page";
import {Product} from "../model/product/Product";
import {AxiosResponse} from "axios";
import {DropdownOption} from "../model/planet/DropdownOption";

export type TDeleteResponse = '';

export function fetchById(id: number) {
    return axiosApi.get<Product>("product/" + id);
}

export function fetchProducts(page: number, size: number) {
    return axiosApi.get<Page<Product>>("product?page=" + page + "&size=" + size);
}

export function saveProduct(product: Product): Promise<AxiosResponse<Product>> {
    return axiosApi.post("product", product);
}

export function deleteProduct(productId: number): Promise<AxiosResponse<void>> {
    return axiosApi.delete("product/" + productId);
}

export function fetchProductsDropdown() {
    return axiosApi.get<DropdownOption[]>("product/utils/dropdown")
}


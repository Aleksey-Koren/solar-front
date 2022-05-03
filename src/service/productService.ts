import {axiosApi} from "../http/axios";
import {Page} from "../model/Page";
import {Product} from "../model/product/Product";
import {AxiosResponse} from "axios";

export type TDeleteResponse = '';

export function fetchProducts(page: number, size: number) {
    return axiosApi.get<Page<Product>>("product?page=" + page + "&size=" + size);
}

export function saveProduct(product: Product): Promise<AxiosResponse<Product>> {
    return axiosApi.post("product", product);
}

export function deleteProduct(productId: number): Promise<AxiosResponse<void>> {
    return axiosApi.delete("product/" + productId);
}
import {axiosApi} from "../http/axios";
import {Page} from "../model/Page";
import {Product} from "../model/product/Product";

export function fetchProducts(page: number, size: number) {
    return axiosApi.get<Page<Product>>("product?page=" + page + "&size=" + size);
}
import {axiosApi} from "../http/axios";
import {Page} from "../model/Page";
import {Product} from "../model/product/Product";

export function fetchProducts(page: number, size: number) {
    if(!page) {
        page = 0
    }

    if(!size) {
        size = 5
    }
    // setTimeout(() => {
    //     return axiosApi.get<Page<Product>>("product?page=" + page + "&size=" + size);
    // },3000);

    setTimeout(() => {}, 3000);
    return axiosApi.get<Page<Product>>("product?page=" + page + "&size=" + size);
}
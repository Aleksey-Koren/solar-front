import {axiosApi} from "../http/axios";

export function findOTDById(id: number) {
    return axiosApi.get(`inventory-item/${id}`)
}
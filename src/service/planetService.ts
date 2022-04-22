import {axiosApi} from "../http/axios";
import {Planet} from "../model/planet/Planet";
import {Page} from "../model/Page";
import qs from "qs";

export function findPlanetsPerPage(page: number, size: number, types?: string[], parentId?: number, ids?: number[]) {

    return axiosApi.get<Page<Planet>>('planet', {
        params: {
            'page': page,
            'size': size,
            'ids': (ids ? ids : []),
            'parentId': (parentId ? parentId : null),
            'types': (types ? types : [])
        },
        paramsSerializer: function (params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
        }
    })
}
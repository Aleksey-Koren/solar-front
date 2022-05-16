import {StationDto} from "../model/station/StationDto";
import {axiosApi} from "../http/axios";
import {Page} from "../model/util/Page";



export function fetchStations(page: number, size: number) {
    return axiosApi.get<Page<StationDto>>("station", {
        params: {
            page: page,
            size: size
        }
    });
}

function foo(arg: number) {

}
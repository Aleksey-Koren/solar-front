import {SET_ERROR, SET_IS_LOADING, SET_STATIONS,} from "./stationTypes";
import {IPlainDataAction} from "../redux-types";
import {AppDispatch} from "../../index";
import {fetchStations} from "../../service/stationService";
import {StationForTable} from "../../model/station/StationForTable";
import {mapStationDtoToStationForTable} from "../../model/station/StationMapper";
import {Page} from "../../model/util/Page";
import {StationDto} from "../../model/station/StationDto";
import {Builder} from "builder-pattern";


export function findStationsActionCreator(page: number, size: number) {
    return (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));

        let pageFromServer: Page<StationDto> | null = null;

        fetchStations(page, size)
            .then(response => {
                pageFromServer = response.data;
                return response.data.content.map(s => mapStationDtoToStationForTable(s))
            })
            .then(s => Promise.all(s)
                .then(values => {
                    let pageToSet: Page<StationForTable> = Builder<Page<StationForTable>>()
                        .size(pageFromServer.size)
                        .totalElements(pageFromServer.totalElements)
                        .number(pageFromServer.number)
                        .content(values)
                        .build();

                dispatch(setStations(pageToSet))
            }))
    }
}

export function setIsLoading (payload: boolean): IPlainDataAction<boolean> {
    return {
        type: SET_IS_LOADING,
        payload: payload
    }
}

export function setStations(payload: Page<StationForTable>): IPlainDataAction<Page<StationForTable>> {
    return {
        type: SET_STATIONS,
        payload: payload
    }
}

export function setError(): IPlainDataAction<boolean> {
    return {
        type: SET_ERROR,
        payload: true
    }
}
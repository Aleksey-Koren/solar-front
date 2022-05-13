import {
    SET_ERROR,
    SET_IS_LOADING,
    SET_STATIONS,
} from "./stationTypes";
import {IPlainDataAction} from "../redux-types";
import {AppDispatch} from "../../index";
import {fetchStations} from "../../service/stationService";
import {StationForTable} from "../../model/station/StationForTable";
import {mapStationDtoToStationForTable} from "../../model/station/StationMapper";


export function findStationsActionCreator(page: number, size: number) {
    return (dispatch: AppDispatch) => {
        dispatch(setIsLoading(true));

        fetchStations(0, 10)
            .then(response => response.data.content.map(s => mapStationDtoToStationForTable(s)))
            .then(s => Promise.all(s).then(values => dispatch(setStations(values))))




        // fetchStations(0, 10)
        //     .then(response => {
        //         let stationsForTable: StationForTable[] = response.data.content.
        //         map(async s => await mapStationDtoToStationForTable(s)).
        //         map(s => {
        //             let stationForTable = null;
        //             console.log("!!!BEFORE " + stationForTable)
        //             s.then(async (s1) => stationForTable = await s1)
        //             console.log("!!!AFTER " + stationForTable)
        //             return stationForTable;
        //         })
        //         return stationsForTable
        //     })
        //     .then(s => dispatch(setStations(s)))






        // fetchStations(0,30)
        //     .then(async (response) => {
        //         let stations: StationForTable[] = await response.data.content.map(s => {
        //             let stFT: StationForTable = null;
        //             mapStationDtoToStationForTable(s).then(stationForTable => stFT = stationForTable)
        //             console.log('??????????????????????????????????????????????' + JSON.stringify(stFT))
        //             return stFT;
        //         })
        //         return stations;
        //     })
        //     .then((stations) => {
        //         console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' + JSON.stringify(stations))
        //         dispatch(setStations(stations))
        //     })
        //     .catch(() =>{
        //         console.log('FetchStations catch');
        //     })
    }
}

export function setIsLoading (payload: boolean): IPlainDataAction<boolean> {
    return {
        type: SET_IS_LOADING,
        payload: payload
    }
}

export function setStations(payload: StationForTable[]): IPlainDataAction<StationForTable[]> {
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
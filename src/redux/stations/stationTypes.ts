import {StationDto} from "../../model/station/StationDto";
import {ActionType, IDefaultStateField, IPaginationState, IPlainDataAction} from "../redux-types";
import {StationForTable} from "../../model/station/StationForTable";

export interface IStationState {
    stations: StationForTable[] | null;
    planetsDropdown: Map<number, string>;
}

export type TStationState = IStationState & IDefaultStateField & IPaginationState;

export type TStationAction = ActionType<StationForTable> | IPlainDataAction<any>;

export interface StationsWithPlanetsDropdownPayload {
    stations: StationForTable[];
    planetsDropdown: Map<number, string>;
}

export const SET_STATIONS = 'SET_STATIONS';
export const SET_ERROR = 'SET_ERROR';
export const SET_IS_LOADING = 'SET_IS_LOADING';
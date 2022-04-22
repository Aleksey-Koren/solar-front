import {Planet} from "../../model/planet/Planet";
import {AxiosResponse} from "axios";
import {Page} from "../../model/Page";

/** STATE */
export interface IDefaultStateField {
    isLoading: boolean;
    isError: boolean;
}

export interface IPlanetState {
    planets: Planet[];
    currentPage: number;
    planetsOnPage: number;
    totalPlanetsAmount: number;
}

export type PlanetState = IPlanetState & IDefaultStateField;

/** ACTION */
interface IPlanetAction {
    type: string;
    payload: Promise<AxiosResponse<Page<Planet>, any>>
}

export type PlanetAction = IPlanetAction;

/** ACTION TYPES */
export const FIND_PLANETS = 'FIND_PLANETS'
export const FIND_PLANETS_FULFILLED = 'FIND_PLANETS_FULFILLED'
export const FIND_PLANETS_REJECTED = 'FIND_PLANETS_REJECTED'
export const FIND_PLANETS_PENDING = 'FIND_PLANETS_PENDING'
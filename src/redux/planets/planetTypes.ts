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
    isMoonsModalOpen: boolean;
    currentPage: number;
    planetsOnPage: number;
    totalPlanetsAmount: number;
    totalPagesAmount: number;
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
/** ---------------------------------------------- */
export const HIDE_ERROR_POPUP = 'HIDE_ERROR_POPUP'
export const SHOW_MOONS_MODAL = 'SHOW_MOONS_MODAL'
export const HIDE_MOONS_MODAL = 'HIDE_MOONS_MODAL'
/** ---------------------------------------------- */
export const FIND_MOONS = 'FIND_MOONS'
export const FIND_MOONS_FULFILLED = 'FIND_MOONS_FULFILLED'
export const FIND_MOONS_REJECTED = 'FIND_MOONS_REJECTED'
export const FIND_MOONS_PENDING = 'FIND_MOONS_PENDING'
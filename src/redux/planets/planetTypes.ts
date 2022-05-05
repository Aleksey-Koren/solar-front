import {Planet} from "../../model/planet/Planet";
import {Page} from "../../model/Page";
import {ActionType, IDefaultStateField} from "../redux-types";

/** STATE */

export interface IPlanetState {
    planets: Planet[];
    isMoonsModalOpen: boolean;
    currentPage: number;
    planetsOnPage: number;
    totalPlanetsAmount: number;
    totalPagesAmount: number;
}

export type PlanetState = IPlanetState & IDefaultStateField;

export type PlanetAction = ActionType<Planet> | ActionType<Page<Planet>>;

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
/** ---------------------------------------------- */
export const UPDATE_PLANET_REJECTED = 'UPDATE_PLANET_REJECTED'
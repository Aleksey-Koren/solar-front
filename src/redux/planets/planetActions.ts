import {
    FIND_MOONS,
    FIND_PLANETS,
    HIDE_ERROR_POPUP,
    HIDE_MOONS_MODAL,
    SHOW_MOONS_MODAL,
    UPDATE_PLANET_REJECTED
} from "./planetTypes";
import {findPlanetsPerPage, savePlanet} from "../../service/planetService";
import {IPendingAction} from "../redux-types";
import {Planet} from "../../model/planet/Planet";
import {Page} from "../../model/util/Page";
import {Dispatch} from "redux";

export function findPlanetsAndStars(page: number, size: number, parentId?: number, ids?: number[]): IPendingAction<Page<Planet>> {
    return {
        type: FIND_PLANETS,
        payload: findPlanetsPerPage(page, size, ['planet', 'star'], parentId, ids)
    }
}

export function findMoons(page: number, size: number, parentId: number): any {
    return {
        type: FIND_MOONS,
        payload: findPlanetsPerPage(page, size, null, parentId)
    }
}

export function updatePlanet(planet: Planet) {
    return (dispatch: Dispatch) => {
        savePlanet(planet)
            .then(() => window.location.href = '/planets')
            .catch(() => dispatch({type: UPDATE_PLANET_REJECTED}))
    }
}

export function showMoonsModal(): any {
    return {
        type: SHOW_MOONS_MODAL,
        payload: null
    }
}

export function hideMoonsModal(): any {
    return {
        type: HIDE_MOONS_MODAL,
        payload: null
    }
}

export function hideErrorPopup(): any {
    return {
        type: HIDE_ERROR_POPUP,
        payload: null
    }
}

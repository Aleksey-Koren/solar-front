import {
    FIND_MOONS,
    FIND_PLANETS,
    HIDE_ERROR_POPUP,
    HIDE_MOONS_MODAL,
    PlanetAction,
    SHOW_MOONS_MODAL
} from "./planetTypes";
import {findPlanetsPerPage} from "../../service/planetService";

export function findPlanetsAndStars(page: number, size: number, parentId?: number, ids?: number[]): PlanetAction {
    return {
        type: FIND_PLANETS,
        payload: findPlanetsPerPage(page, size, ['planet', 'star'], parentId, ids)
    }
}

export function findMoons(page: number, size: number, parentId: number): PlanetAction {
    return {
        type: FIND_MOONS,
        payload: findPlanetsPerPage(page, size, null, parentId)
    }
}

export function showMoonsModal(): PlanetAction {
    return {
        type: SHOW_MOONS_MODAL,
        payload: null
    }
}

export function hideMoonsModal(): PlanetAction {
    return {
        type: HIDE_MOONS_MODAL,
        payload: null
    }
}

export function hideErrorPopup(): PlanetAction {
    return {
        type: HIDE_ERROR_POPUP,
        payload: null
    }
}

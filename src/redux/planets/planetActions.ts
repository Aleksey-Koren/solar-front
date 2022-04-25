import {FIND_PLANETS, PlanetAction} from "./planetTypes";
import {findPlanetsPerPage} from "../../service/planetService";

export function findPlanetsAndStars(page: number, size: number, parentId?: number, ids?: number[]): PlanetAction {
    return {
        type: FIND_PLANETS,
        payload: findPlanetsPerPage(page, size, ['planet', 'star'], parentId, ids)
    }
}
import {Planet} from "../../model/planet/Planet";
import {FIND_PLANETS_FULFILLED, FIND_PLANETS_PENDING, FIND_PLANETS_REJECTED, PlanetState} from "./planetTypes";

const initState = {
    isLoading: false,
    isError: false,
    planets: new Array<Planet>(),
    currentPage: 0,
    planetsOnPage: 10,
    totalPlanetsAmount: 10
}

export function planetReducer(state: PlanetState = initState, action: any) {
    switch (action.type) {
        case FIND_PLANETS_PENDING :
            return {...state, isLoading: true};
        case FIND_PLANETS_FULFILLED:
            return {
                planets: action.payload.data.content,
                currentPage: action.payload.data.number,
                planetsOnPage: action.payload.data.size,
                totalPlanetsAmount: action.payload.data.totalElements,
                isError: false,
                isLoading: false
            };
        case FIND_PLANETS_REJECTED:
            return {...state, isError: true};
        default:
            return state;
    }
}
import {Planet} from "../../model/planet/Planet";
import {
    FIND_MOONS_FULFILLED,
    FIND_MOONS_PENDING,
    FIND_MOONS_REJECTED,
    FIND_PLANETS_FULFILLED,
    FIND_PLANETS_PENDING,
    FIND_PLANETS_REJECTED,
    HIDE_ERROR_POPUP,
    HIDE_MOONS_MODAL,
    PlanetState,
    SHOW_MOONS_MODAL,
} from "./planetTypes";
import {Page} from "../../model/Page";
import {IFulfilledAction, PlanetActionNew} from "../redux-types";

const initState = {
    isLoading: false,
    isError: false,
    isMoonsModalOpen: false,
    planets: new Array<Planet>(),
    currentPage: 0,
    planetsOnPage: 10,
    totalPlanetsAmount: 10,
    totalPagesAmount: 1
}

export function planetReducer(state: PlanetState = initState, action: PlanetActionNew) {
    switch (action.type) {
        case FIND_MOONS_PENDING:
        case FIND_PLANETS_PENDING :
            return {...state, isLoading: true};

        case FIND_MOONS_FULFILLED:
        case FIND_PLANETS_FULFILLED:
            const action1 = action as IFulfilledAction<Page<Planet>>;
            return {
                ...state,
                planets: action1.payload.data.content,
                currentPage: action1.payload.data.number,
                planetsOnPage: action1.payload.data.size,
                totalPlanetsAmount: action1.payload.data.totalElements,
                totalPagesAmount: action1.payload.data.totalPages,
                isError: false,
                isLoading: false
            };

        case FIND_MOONS_REJECTED:
        case FIND_PLANETS_REJECTED:
            return {...state, isError: true, isLoading: false};

        case HIDE_ERROR_POPUP:
            return {...state, isError: false, isLoading: false};
        case SHOW_MOONS_MODAL:
            return {...state, isMoonsModalOpen: true};
        case HIDE_MOONS_MODAL:
            return {...state, isMoonsModalOpen: false};

        default:
            return state;
    }
}
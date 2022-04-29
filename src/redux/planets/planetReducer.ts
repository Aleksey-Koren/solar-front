import {Planet} from "../../model/planet/Planet";
import {
    FIND_MOONS_FULFILLED,
    FIND_MOONS_PENDING,
    FIND_MOONS_REJECTED,
    FIND_PLANETS_FULFILLED,
    FIND_PLANETS_PENDING,
    FIND_PLANETS_REJECTED,
    HIDE_ERROR_POPUP,
    HIDE_MOONS_MODAL, IPlanetState, PlanetAction,
    PlanetState,
    SHOW_MOONS_MODAL,
} from "./planetTypes";
import {AxiosResponse} from "axios";
import {Page} from "../../model/Page";

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

export function planetReducer(state: PlanetState = initState, action: PlanetAction) {
    switch (action.type) {
        case FIND_MOONS_PENDING:
        case FIND_PLANETS_PENDING :
            return {...state, isLoading: true};

        case FIND_MOONS_FULFILLED:
        case FIND_PLANETS_FULFILLED:
            const payload = action.payload as AxiosResponse<Page<Planet>>;
            return {
                ...state,
                planets: payload.data.content,
                currentPage: payload.data.number,
                planetsOnPage: payload.data.size,
                totalPlanetsAmount: payload.data.totalElements,
                totalPagesAmount: payload.data.totalPages,
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
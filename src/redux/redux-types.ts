import {AxiosResponse} from "axios";
import {Planet} from "../model/planet/Planet";
import {Page} from "../model/Page";

export interface IFulfilledAction<T> {
    type: String,
    payload: AxiosResponse<T>
}

export interface IPendingAction<T> {
    type: String,
    payload: Promise<AxiosResponse<T>>
}

export interface IRejectedAction {
    type: String,
    payload: null
}

export interface IPlainDataAction<T> {
    type: String,
    payload: T
}

export type IReduxPromiseAction<T> = IPendingAction<T> | IFulfilledAction<T> | IRejectedAction;

export type ActionType<T> = IReduxPromiseAction<T> | IPlainDataAction<T>;

export type PlanetActionNew = ActionType<Planet> | ActionType<Page<Planet>>;

// as IFulfilledAction<Page<Planet>>

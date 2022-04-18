import {User} from "../model/User";
import {axiosApi} from "../http/axios";
import {RegisterResponse} from "../model/RegisterResponse";
import {Token} from "../model/Token";

export function register(user: User) {

    return axiosApi.post<RegisterResponse>('register', user);
}

export function login(user: User) {

    return axiosApi.post<Token>('login', user);
}
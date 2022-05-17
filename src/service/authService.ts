import {User} from "../model/User";
import {axiosApi} from "../http/axios";
import {RegisterResponse} from "../model/RegisterResponse";
import {Token} from "../model/Token";
import jwtDecode from "jwt-decode";
import {DecodedJwtToken} from "../model/decodedJwtToken";

export function register(user: User) {

    return axiosApi.post<RegisterResponse>('register', user);
}

export function login(user: User) {

    return axiosApi.post<Token>('login', user);
}

export function retrieveUserId() {
    const token = sessionStorage.getItem('auth_token');

    return jwtDecode<DecodedJwtToken>(token).user_id;
}
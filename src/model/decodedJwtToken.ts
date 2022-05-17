import {JwtPayload} from "jwt-decode";

export interface DecodedJwtToken extends JwtPayload {
    user_id: number,
    roles: string[]
}
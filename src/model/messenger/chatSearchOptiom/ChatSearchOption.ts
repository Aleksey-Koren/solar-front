import {Room} from "../room/Room";
import {User} from "../../User";
import {SearchRoom} from "../room/SearchRoom";

export class ChatSearchOption {
    type: ChatSearchOptionType;
    payload: SearchRoom | User;

    constructor(type: ChatSearchOptionType, payload: SearchRoom | User) {
        this.type = type;
        this.payload = payload;
    }
}

export enum ChatSearchOptionType {
    ROOM = 'ROOM',
    USER = 'USER'
}
import {Room} from "../../model/messenger/room/Room";
import {MessageEntity} from "../../model/messenger/message/MessageEntity";
import {User} from "../../model/User";
import {IDefaultStateField, IPlainDataAction} from "../redux-types";

interface IMessengerState {
    rooms: Room[];
    messages: Map<number, MessageEntity[]>
    roomMembers: Map<number, User[]>

}

export type TMessengerState = IMessengerState & IDefaultStateField;

export type TMessengerAction = IPlainDataAction<any>;

export const SET_ROOMS = 'SET_ROOMS';
export const SET_MESSAGES = 'SET_MESSAGES';

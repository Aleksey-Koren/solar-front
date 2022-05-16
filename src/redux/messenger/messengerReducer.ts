import {SET_MESSAGES, SET_ROOMS, TMessengerAction, TMessengerState} from "./messengerTypes";
import {Room} from "../../model/messenger/room/Room";
import {MessageEntity} from "../../model/messenger/message/MessageEntity";
import {User} from "../../model/User";
import {IPlainDataAction} from "../redux-types";

const initialState: TMessengerState = {
    rooms: new Array<Room>(),
    messages: new Map<number, MessageEntity[]>(),
    roomMembers: new Map<number, User[]>(),
    isError: false,
    isLoading: false
}

export function messengerReducer(state: TMessengerState = initialState, action: TMessengerAction) {
    switch (action.type) {

        case SET_ROOMS:
            let setRoomsAction = action as IPlainDataAction<Room[]>;
            return {...state, rooms: setRoomsAction.payload}

        case SET_MESSAGES:
            let setMessagesAction = action as IPlainDataAction<Map<number, MessageEntity[]>>;
            console.log(setMessagesAction.payload);
            return {...state, messages: setMessagesAction.payload}

        default: return state;
    }
}
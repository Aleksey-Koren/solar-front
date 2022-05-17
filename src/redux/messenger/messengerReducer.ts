import {FETCH_ROOMS, SET_MESSAGES, SET_ROOMS, TMessengerAction, TMessengerState} from "./messengerTypes";
import {Room} from "../../model/messenger/room/Room";
import {MessageEntity} from "../../model/messenger/message/MessageEntity";
import {User} from "../../model/User";
import {FULFILLED_POSTFIX, IFulfilledAction, IPlainDataAction, PENDING_POSTFIX, REJECTED_POSTFIX} from "../redux-types";
import Immutable from "immutable";

const initialState: TMessengerState = {
    rooms: new Array<Room>(),
    messages: Immutable.Map<number, MessageEntity[]>(),
    roomMembers: new Map<number, User[]>(),
    isError: false,
    isLoading: false
}

export function messengerReducer(state: TMessengerState = initialState, action: TMessengerAction) {
    switch (action.type) {

        case FETCH_ROOMS + PENDING_POSTFIX:
            return {...state, isLoading: true};

        case FETCH_ROOMS + FULFILLED_POSTFIX:
            const fulfilledAction = action as IFulfilledAction<Room[]>;
            return {...initialState, rooms: fulfilledAction.payload.data};

        case FETCH_ROOMS + REJECTED_POSTFIX:
            return {...state, isError: true};

        case SET_ROOMS:
            let setRoomsAction = action as IPlainDataAction<Room[]>;
            return {...state, rooms: setRoomsAction.payload}

        case SET_MESSAGES:
            let setMessagesAction = action as IPlainDataAction<Immutable.Map<number, MessageEntity[]>>;
            console.log(setMessagesAction.payload);
            return {...state, messages: setMessagesAction.payload}

        default:
            return state;
    }
}
import {MessageEntity} from "../../model/messenger/message/MessageEntity";
import {Room} from "../../model/messenger/room/Room";
import {AppDispatch} from "../../index";
import {connectStompClient, subscribeToRooms} from "../../http/webSocket";
import {RoomService} from "../../service/messenger/RoomService";
import {IPendingAction, IPlainDataAction} from "../redux-types";
import {FETCH_ROOMS, SET_MESSAGES, SET_ROOMS} from "./messengerTypes";
import Immutable from "immutable";

export function messengerInitialization() {
    return (dispatch: AppDispatch) => {

        const callback = () => {
            RoomService.getRoomsWithAmountUnreadMessages()
                .then(resp => {
                    subscribeToRooms(resp.data);
                    dispatch(setRoomsToState(resp.data));
                })
        }

        connectStompClient(sessionStorage.getItem('auth_token'), callback);
    }
}

export function setRoomsToState(payload: Room[]): IPlainDataAction<Room[]> {
    return {
        type: SET_ROOMS,
        payload: payload
    }
}

export function setMessagesToState(payload: Immutable.Map<number, MessageEntity[]>): IPlainDataAction<Immutable.Map<number, MessageEntity[]>> {
    return {
        type: SET_MESSAGES,
        payload: payload
    }
}

export function fetchRooms(): IPendingAction<Room[]> {

    return {
        type: FETCH_ROOMS,
        payload: RoomService.getRoomsWithAmountUnreadMessages()
    }
}
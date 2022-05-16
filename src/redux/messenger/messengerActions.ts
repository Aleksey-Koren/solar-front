import {MessageEntity} from "../../model/messenger/message/MessageEntity";
import {Room} from "../../model/messenger/room/Room";
import {AppDispatch} from "../../index";
import {connectStompClient, subscribeToRooms} from "../../http/webSocket";
import {RoomService} from "../../service/messenger/RoomService";
import {IPlainDataAction} from "../redux-types";
import {SET_MESSAGES, SET_ROOMS} from "./messengerTypes";

export function messengerInitialization() {
    return (dispatch: AppDispatch) => {

        const callback = () => {
            RoomService.getRoomsWithAmountUnreadMessages()
                .then(resp => {
                    subscribeToRooms(resp.data, dispatch, new Map<number, MessageEntity[]>());
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

export function setMessagesToState(payload: Map<number, MessageEntity[]>): IPlainDataAction<Map<number, MessageEntity[]>> {
    return {
        type: SET_MESSAGES,
        payload: payload
    }
}
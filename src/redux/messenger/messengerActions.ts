import {MessageEntity} from "../../model/messenger/message/MessageEntity";
import {Room} from "../../model/messenger/room/Room";
import {AppDispatch, AppState} from "../../index";
import {connectStompClient, subscribeToRooms} from "../../http/webSocket";
import {RoomService} from "../../service/messenger/RoomService";
import {IPendingAction, IPlainDataAction} from "../redux-types";
import {FETCH_ROOMS, SET_MESSAGES, SET_ROOM_MEMBERS, SET_ROOMS} from "./messengerTypes";
import Immutable from "immutable";
import {User} from "../../model/User";
import {retrieveUserId} from "../../service/authService";

export function messengerInitialization() {
    return (dispatch: AppDispatch, getState: () => AppState) => {

        const callback = () => {
            RoomService.getRoomsWithAmountUnreadMessages()
                .then(resp => {
                    subscribeToRooms(resp.data, getState, dispatch);
                    dispatch(setRoomsToState(resp.data));
                })
        }

        connectStompClient(sessionStorage.getItem('auth_token'), callback);
    }
}

export function createPrivateRoomWith(invitedId: number) {
    return (dispatch: AppDispatch) => {
        RoomService.createRoom({userId: retrieveUserId(), isPrivate: true})
            .then(room => {
                RoomService.inviteToRoom(invitedId, room.data.id)
                    .then(s => room)
                    .then( )
            })
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

export function setRoomMembersToState(payload: Immutable.Map<number, User[]>): IPlainDataAction<Immutable.Map<number, User[]>> {

    return {
        type: SET_ROOM_MEMBERS,
        payload: payload
    }
}

export function fetchRooms(): IPendingAction<Room[]> {

    return {
        type: FETCH_ROOMS,
        payload: RoomService.getRoomsWithAmountUnreadMessages()
    }
}


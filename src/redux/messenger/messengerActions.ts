import {MessageEntity} from "../../model/messenger/message/MessageEntity";
import {Room} from "../../model/messenger/room/Room";
import {AppDispatch, AppState} from "../../index";
import {connectStompClient, stompClient, subscribeToRooms} from "../../http/webSocket";
import {RoomService} from "../../service/messenger/room/RoomService";
import {IPendingAction, IPlainDataAction} from "../redux-types";
import {
    FETCH_ROOMS,
    SET_IS_ADD_USERS_OPENED,
    SET_EDIT_TITLE_OPEN,
    SET_MESSAGES,
    SET_PARTICIPANTS_LIST_MODAL_OPEN, SET_ROOM_MEMBERS,
    SET_ROOMS, SET_SELECTED_ROOM
} from "./messengerTypes";
import Immutable from "immutable";
import {User} from "../../model/User";
import {Message} from "stompjs";
import {NotificationService} from "../../service/messenger/NotificationService";

export function messengerInitialization() {
    return (dispatch: AppDispatch, getState: () => AppState) => {

        const callback = () => {
            RoomService.getRoomsWithAmountUnreadMessages()
                .then(resp => {
                    subscribeToRooms(resp.data, getState, dispatch);
                    stompClient.subscribe('/user/notifications', (notification: Message) => NotificationService.processNotification(notification, getState, dispatch));
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

export function setEditTitleOpen(isOpen: boolean): IPlainDataAction<boolean> {

    return {
        type: SET_EDIT_TITLE_OPEN,
        payload: isOpen
    }
}

export function updateRoomTitle(roomId: number, title: string) {
    return (dispatch: AppDispatch) => {
        RoomService.updateRoomTitle(roomId, title)
            .then(() => dispatch(setEditTitleOpen(false)))
    }
}

export function setIsAddUsersModalOpened(isOpened: boolean): IPlainDataAction<boolean> {
    return {
        type: SET_IS_ADD_USERS_OPENED,
        payload: isOpened
    }
}

export function setParticipantsListModalOpen(isOpen: boolean): IPlainDataAction<boolean> {

    return {
        type: SET_PARTICIPANTS_LIST_MODAL_OPEN,
        payload: isOpen
    }
}

export function setSelectedRoom(room: Room): IPlainDataAction<Room> {
    return {
        type: SET_SELECTED_ROOM,
        payload: room
    }
}


import {Message} from "stompjs";
import {AppDispatch, AppState} from "../../index";
import {Room} from "../../model/messenger/room/Room";
import {setRoomMembersToState, setRoomsToState, setSelectedRoom} from "../../redux/messenger/messengerActions";
import {subscribeToRooms} from "../../http/webSocket";
import {NotificationType} from "../../model/messenger/notification/notificationType";
import {TMessengerState} from "../../redux/messenger/messengerTypes";
import {retrieveUserId} from "../authService";
import {DepartedUserNotificationPayload} from "../../model/messenger/notification/departedUserNotificationPayload";
import Immutable from "immutable";

interface Notification {
    type: NotificationType;
    payload: any | undefined;
}

export class NotificationService {

    static processNotification(notificationMessage: Message, getState: () => AppState, dispatch: AppDispatch) {
        const notification: Notification = JSON.parse(notificationMessage.body);

        switch (notification.type) {

            case NotificationType.INVITED_TO_ROOM:
                processInvitedToRoom(notification, getState, dispatch);
                break;

            case NotificationType.EDITED_ROOM_TITLE:
                const updatedRoom = notification.payload as Room;
                updateRoomTitle(updatedRoom.id, updatedRoom.title, getState().messenger.rooms, dispatch);
                break;

            case NotificationType.KICK_OR_LEAVE_USER_FROM_ROOM:
                processKickOrLeaveUserFromRoom(notification, getState().messenger, dispatch);
                break;

            case NotificationType.ROOM_DELETED:
                processRoomDeleted(notification, getState().messenger, dispatch);
                break;

            default:
                throw new Error("Unknown notification Type");
        }
    }

}

function processInvitedToRoom(notification: Notification, getState: () => AppState, dispatch: AppDispatch) {
    let state: AppState = getState();
    let rooms: Room[] = new Array<Room>(...state.messenger.rooms);
    let room: Room = notification.payload as Room;
    rooms.push(room);
    dispatch(setRoomsToState(rooms));
    subscribeToRooms([room], getState, dispatch);
}


function processKickOrLeaveUserFromRoom(notification: Notification, messengerState: TMessengerState, dispatch: AppDispatch) {
    const notificationPayload = notification.payload as DepartedUserNotificationPayload;

    if (notificationPayload.kickedUserId === retrieveUserId()) {
        const updatedRooms = messengerState.rooms.filter(room => room.id !== notificationPayload.roomId);
        dispatch(setRoomsToState(updatedRooms));
        dispatch(setSelectedRoom(null));
    } else {
        const filteredMembers = messengerState.roomMembers.get(notificationPayload.roomId)
            .filter(member => member.id !== notificationPayload.kickedUserId);

        const updatedRoomMembersMap = new Map(messengerState.roomMembers).set(notificationPayload.roomId, filteredMembers);
        dispatch(setRoomMembersToState(Immutable.Map(updatedRoomMembersMap)))

        updateRoomTitle(notificationPayload.roomId, notificationPayload.roomTitle, messengerState.rooms, dispatch);
    }
}

function updateRoomTitle(roomId: number, updatedTitle: string, rooms: Room[], dispatch: AppDispatch) {
    const updatedRooms = rooms.map(room => {
        if (room.id === roomId) {
            room.title = updatedTitle
        }
        return room;
    })
    dispatch(setRoomsToState(updatedRooms))
}

function processRoomDeleted(notification: Notification, messenger: TMessengerState, dispatch: AppDispatch) {
    const deletedRoomId = notification.payload as number;

    const filteredRooms = messenger.rooms.filter(room => room.id !== deletedRoomId);
    dispatch(setRoomsToState(filteredRooms));

    if (messenger.selectedRoom?.id === deletedRoomId) {
        dispatch(setSelectedRoom(null));
    }
}
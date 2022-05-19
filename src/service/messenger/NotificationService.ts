import {Message} from "stompjs";
import {AppDispatch, AppState} from "../../index";
import {Room} from "../../model/messenger/room/Room";
import {setRoomsToState} from "../../redux/messenger/messengerActions";
import {subscribeToRooms} from "../../http/webSocket";

enum NotificationType {
    INVITED_TO_ROOM = 'INVITED_TO_ROOM'
}

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
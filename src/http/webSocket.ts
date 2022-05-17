import SockJS from "sockjs-client";
import {Client, Message, over} from "stompjs";
import {Room} from "../model/messenger/room/Room";
import {AppDispatch, AppState} from "../index";
import {MessageEntity} from "../model/messenger/message/MessageEntity";
import {RoomService} from "../service/messenger/RoomService";
import Immutable from "immutable";
import {setMessagesToState, setRoomsToState} from "../redux/messenger/messengerActions";

export let stompClient: Client = null;

export function connectStompClient(authToken: string, callback: () => void) {
    const sockJS = new SockJS('http://localhost:8081/api/ws', {}, {timeout: -1});
    stompClient = over(sockJS);
    stompClient.connect({'auth_token': authToken}, callback, () => console.log('WEB SOCKET ERROR'));
}

export function subscribeToRooms(rooms: Room[], getState: () => AppState, dispatch: AppDispatch) {
    rooms.forEach(room => {
        stompClient.subscribe(`/room/${room.id}`, (message: Message) => processMessage(message, getState, dispatch));
    })
}

function processMessage(message: Message, getState: () => AppState, dispatch: AppDispatch) {
    const messageEntity: MessageEntity = JSON.parse(message.body);
    const messageRoomId = messageEntity.roomId;
    const messages = getState().messenger.messages;

    if (messages.has(messageRoomId)) {
        const map = new Map(messages);
        map.set(messageRoomId, [...messages.get(messageRoomId), messageEntity]);

        dispatch(setMessagesToState(Immutable.Map(map)))
        RoomService.updateLastSeenAt(messageRoomId).then();
    } else {
        const rooms = getState().messenger.rooms;
        const updatedRooms = rooms.map(room => {
            if (room.id === messageRoomId) {
                room.amount++;
            }
            return room;
        })
        dispatch(setRoomsToState(updatedRooms));
    }
}

export function sendMessage(roomId: number, senderId: number, message: string) {
    console.log(roomId + "   sender: " + senderId + "    mes: " + message)

    stompClient.send(`/chat/${roomId}`, {}, JSON.stringify({
        senderId: senderId,
        message: message
    }));
}
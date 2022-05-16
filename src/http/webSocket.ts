import SockJS from "sockjs-client";
import {Client, Message, over} from "stompjs";
import {Room} from "../model/messenger/room/Room";
import {AppDispatch} from "../index";
import {MessageEntity} from "../model/messenger/message/MessageEntity";
import {RoomService} from "../service/messenger/RoomService";

export let stompClient: Client = null;

export function connectStompClient(authToken: string, callback: () => void) {
    const sockJS = new SockJS('http://localhost:8081/api/ws', {});
    stompClient = over(sockJS);


    stompClient.connect({'auth_token': authToken},
        callback,
        () => console.log('WEB SOCKET ERROR')
    );
}

export function subscribeToRooms(rooms: Room[], dispatch: AppDispatch, messagesMap: Map<number, MessageEntity[]>) {
    rooms.forEach(room => {
        stompClient.subscribe(`/room/${room.id}`, (message: Message) => processMessage(message, dispatch, messagesMap, rooms));
    })
}

function processMessage(message: Message,
                        dispatch: AppDispatch,
                        messagesMap: Map<number, MessageEntity[]>,
                        rooms: Room[]) {

    const messageEntity: MessageEntity = JSON.parse(message.body);
    if (messagesMap.has(messageEntity.roomId)) {
        messagesMap.set(messageEntity.roomId, [...messagesMap.get(messageEntity.roomId), messageEntity]);
        let newMap = {... messagesMap};
        messagesMap = newMap;
        RoomService.updateLastSeenAt(messageEntity.roomId).then();
    } else {
        rooms = rooms.map(s => {
            if (s.id === messageEntity.roomId) {
                s.amount++
            }
            return s;
        });
    }
}

export function sendMessage(roomId: number, senderId: number, message: string) {
    console.log(roomId + "   sender: " + senderId + "    mes: " + message)

    stompClient.send(`/chat/${roomId}`, {}, JSON.stringify({
        senderId: senderId,
        message: message
    }));
}
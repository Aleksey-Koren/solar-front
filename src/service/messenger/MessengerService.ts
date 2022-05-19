import {Room} from "../../model/messenger/room/Room";
import {AppDispatch} from "../../index";
import {Dispatch, SetStateAction} from "react";
import Immutable from "immutable";
import {MessageEntity} from "../../model/messenger/message/MessageEntity";
import {User} from "../../model/User";
import {RoomService} from "./room/RoomService";
import {setMessagesToState, setRoomMembersToState} from "../../redux/messenger/messengerActions";
import {MessageService} from "./message/MessageService";
import {RoomType} from "../../model/messenger/room/RoomType";
import {retrieveUserId} from "../authService";

export class MessengerService {

    static fetchMessages(room: Room,
                         dispatch: AppDispatch,
                         setRoom: Dispatch<SetStateAction<Room>>,
                         messages: Immutable.Map<number, MessageEntity[]>,
                         roomMembers: Immutable.Map<number, User[]>
    ) {
        Promise.all([
            RoomService.updateLastSeenAt(room.id),
            MessageService.getMessageHistory(room.id, 0, 20),
            RoomService.getUsersOfRoom(room.id)
        ]).then(([lastSeenAtResp, messagesResp, usersResp]) => {
            setRoom(room);

            const roomMembersMap = new Map(roomMembers).set(room.id, usersResp.data);
            dispatch(setRoomMembersToState(Immutable.Map(roomMembersMap)));

            const messagesMap = new Map(messages).set(room.id, messagesResp.data.content.reverse());
            dispatch(setMessagesToState(Immutable.Map(messagesMap)));
        })
    }

    static generateMessageInfo(message: MessageEntity, roomMembers: User[]) {
        const user = roomMembers.find(member => member.id === message.senderId);
        const messageDate = new Date(message.createdAt).toLocaleTimeString();

        return `${messageDate} | ${user.title}`;
    }

    static retrieveRoomTitle(room: Room) {
        if (room?.roomType === RoomType.PRIVATE) {
            const parsedTitle = JSON.parse(room.title) as string[];
            const splitTitle = parsedTitle.map(titleArrayElement => titleArrayElement.split(":"));

            return Number(splitTitle[0][0]) === retrieveUserId() ? splitTitle[1][1] : splitTitle[0][1];
        }

        return room?.title;
    }
}
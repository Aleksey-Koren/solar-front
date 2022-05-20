import {MessageEntity} from "../../../model/messenger/message/MessageEntity";
import Immutable from "immutable";
import {AppDispatch} from "../../../index";
import {setMessagesToState, setRoomsToState} from "../../../redux/messenger/messengerActions";
import {RoomService} from "../room/RoomService";
import {Room} from "../../../model/messenger/room/Room";

export class ProcessChatMessageService {

    static appendOrUpdateMessage(messageEntity: MessageEntity, messages: Immutable.Map<number, MessageEntity[]>, dispatch: AppDispatch) {
        const map = new Map(messages);
        const messageRoomId = messageEntity.roomId;
        const foundMessage = map.get(messageRoomId).find(message => message.id === messageEntity.id);

        if (foundMessage) {
            foundMessage.message = messageEntity.message;
        } else {
            map.set(messageRoomId, [...messages.get(messageRoomId), messageEntity]);
        }

        dispatch(setMessagesToState(Immutable.Map(map)))
        RoomService.updateLastSeenAt(messageRoomId).then();
    }

    static updateUnreadMessageAmount(rooms: Room[], messageRoomId: number, dispatch: AppDispatch) {
        const updatedRooms = rooms.map(room => {
            if (room.id === messageRoomId) {
                room.amount++;
            }
            return room;
        })
        dispatch(setRoomsToState(updatedRooms));
    }
}
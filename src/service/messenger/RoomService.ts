import {axiosApi} from "../../http/axios";
import {SearchRoom} from "../../model/messenger/room/SearchRoom";
import {CreateRoom} from "../../model/messenger/room/CreateRoom";
import {Room} from "../../model/messenger/room/Room";
import {User} from "../../model/User";

export class RoomService {

    static findRoomsWithSpecificUser(userId: number = null, title: string = null, roomType: string = null) {

        return axiosApi.get<SearchRoom[]>('chat/room', {
            params: {
                userId: userId,
                title: title,
                roomType: roomType
            }
        })
    }

    static createRoom(createRoom: CreateRoom) {

        return axiosApi.post<Room>('chat/room', createRoom);
    }

    static getRoomsWithAmountUnreadMessages() {

        return axiosApi.get<Room[]>('chat/room/user');
    }

    static inviteToRoom(invitedId: number, roomId: number) {

        return axiosApi.patch<void>(`chat/room/${roomId}/participants`, {invitedId: invitedId});
    }

    static leaveFromRoom(roomId: number) {

        return axiosApi.patch<void>(`chat/room/${roomId}/leave`);
    }

    static getUsersOfRoom(roomId: number) {

        return axiosApi.get<User[]>(`chat/room/${roomId}/participants`);
    }

    static updateRoomTitle(roomId: number, roomTitle: string) {

        return axiosApi.patch<void>(`chat/room/${roomId}/title`, {roomTitle: roomTitle});
    }

    static updateLastSeenAt(roomId: number) {

        return axiosApi.put<void>(`chat/room/${roomId}/lastSeenAt`);
    }

}

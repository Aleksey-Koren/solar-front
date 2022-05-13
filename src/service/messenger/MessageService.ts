import {axiosApi} from "../../http/axios";
import {Page} from "../../model/util/Page";
import {Message} from "../../model/messenger/message/Message";

export class MessageService {

    static getMessageHistory(roomId: number, page?: number, size?: number) {

        return axiosApi.get<Page<Message>>(`chat/room/${roomId}/messages`);
    }

    static saveEmailNotifications(messageTypes: string[]) {

        return axiosApi.post<void>('chat/email', messageTypes);
    }
}
import {axiosApi} from "../../../http/axios";
import {Page} from "../../../model/util/Page";
import {MessageEntity} from "../../../model/messenger/message/MessageEntity";

export class MessageService {

    static getMessageHistory(roomId: number, page?: number, size?: number) {

        return axiosApi.get<Page<MessageEntity>>(`chat/room/${roomId}/messages`);
    }

    static saveEmailNotifications(messageTypes: string[]) {

        return axiosApi.post<void>('chat/email', messageTypes);
    }
}
export class MessageEntity {
    id: number | null = null;
    senderId: number | null = null;
    roomId: number | null = null;
    title: string | null = null;
    message: string | null = null;
    createdAt: Date | null = null;
    editedAt: Date | null = null;
    messageType: string | null = null;
}
import {RoomType} from "./RoomType";
import {Subscription} from "stompjs";

export class Room {
    id: number | null = null;
    title: string | null = null;
    createdAt: Date | null = null;
    ownerId: number | null = null;
    amount: number | null = null;
    roomType: RoomType | null = null;
    subscription: Subscription | null = null;
}
import {Permission} from "./Permission";

export class User {
    id: number = null;
    title: string = null;
    login: string = null;
    email: string = null;
    password: string = null;
    money: number = null;
    locationId: number = null;
    hackBlock: Date = null;
    hackAttempts: Date = null;
    avatar: string = null;
    emailNotifications: number = null;
    permissions: Permission[] = [];
}
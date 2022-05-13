import {Room} from "./Room";
import {User} from "../../User";

export class SearchRoom extends Room {
    participants: User[] | null = null;
}
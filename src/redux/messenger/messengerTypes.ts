import {Room} from "../../model/messenger/room/Room";
import {MessageEntity} from "../../model/messenger/message/MessageEntity";
import {User} from "../../model/User";
import {IDefaultStateField, IPlainDataAction, IReduxPromiseAction} from "../redux-types";
import Immutable from "immutable";

interface IMessengerState {
    rooms: Room[];
    messages: Immutable.Map<number, MessageEntity[]>;
    roomMembers: Immutable.Map<number, User[]>;
    isEditTitleModalOpen: boolean;
    isParticipantsListModalOpen: boolean;
}

export type TMessengerState = IMessengerState & IDefaultStateField;

export type TMessengerAction = IReduxPromiseAction<Room[]> | IPlainDataAction<any>;

export const SET_ROOMS = 'SET_ROOMS';
export const SET_MESSAGES = 'SET_MESSAGES';
export const FETCH_ROOMS = 'FETCH_ROOMS';
export const SET_ROOM_MEMBERS = 'SET_ROOM_MEMBERS';
export const SET_EDIT_TITLE_OPEN = 'SET_EDIT_TITLE_OPEN';
export const SET_PARTICIPANTS_LIST_MODAL_OPEN = 'SET_PARTICIPANTS_LIST_MODAL_OPEN';

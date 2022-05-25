import {Room} from "../../model/messenger/room/Room";
import {MessageEntity} from "../../model/messenger/message/MessageEntity";
import {User} from "../../model/User";
import {IDefaultStateField, IPlainDataAction, IReduxPromiseAction} from "../redux-types";
import Immutable from "immutable";

interface IMessengerState {
    rooms: Room[];
    messages: Immutable.Map<number, MessageEntity[]>;
    roomMembers: Immutable.Map<number, User[]>;
    selectedRoom: Room | null;
    isEditTitleModalOpen: boolean;
    isAddUsersModalOpened: boolean;
    isParticipantsListModalOpen: boolean;
    isNewRoomModalOpened: boolean;
    isTitleAlreadyExistsModalOpened: boolean;
}

export type TMessengerState = IMessengerState & IDefaultStateField;

export type TMessengerAction = IReduxPromiseAction<Room[]> | IPlainDataAction<any>;

export const SET_ROOMS = 'SET_ROOMS';
export const SET_MESSAGES = 'SET_MESSAGES';
export const FETCH_ROOMS = 'FETCH_ROOMS';
export const SET_ROOM_MEMBERS = 'SET_ROOM_MEMBERS';
export const SET_EDIT_TITLE_OPEN = 'SET_EDIT_TITLE_OPEN';
export const SET_IS_ADD_USERS_OPENED = 'SET_ADD_USERS_OPENED';
export const SET_PARTICIPANTS_LIST_MODAL_OPEN = 'SET_PARTICIPANTS_LIST_MODAL_OPEN';
export const SET_SELECTED_ROOM = 'SET_SELECTED_ROOM';
export const SET_IS_NEW_ROOM_MODAL_OPENED = 'SET_IS_NEW_ROOM_MODAL_OPENED';
export const SET_IS_TITLE_ALREADY_EXISTS_MODAL_OPENED = 'SET_IS_TITLE_ALREADY_EXISTS_MODAL_OPENED';

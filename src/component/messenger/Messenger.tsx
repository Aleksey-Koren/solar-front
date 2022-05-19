import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid/Grid';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import Paper from '@mui/material/Paper/Paper';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import style from './Messenger.module.css'
import {AppDispatch, AppState, useAppDispatch} from "../../index";
import {connect, ConnectedProps} from "react-redux";
import {MessageEntity} from "../../model/messenger/message/MessageEntity";
import {
    messengerInitialization,
    setMessagesToState,
    setRoomMembersToState
} from "../../redux/messenger/messengerActions";
import {retrieveUserId} from "../../service/authService";
import AsyncSelect from "react-select/async";
import {findUsersPerPage} from "../../service/userService";
import {ChatSearchOption, ChatSearchOptionType} from "../../model/messenger/chatSearchOptiom/ChatSearchOption";
import {RoomType} from "../../model/messenger/room/RoomType";
import jwtDecode from "jwt-decode";
import {DecodedJwtToken} from "../../model/decodedJwtToken";
import {SearchRoom} from "../../model/messenger/room/SearchRoom";
import Immutable from "immutable";
import {MessageService} from '../../service/messenger/MessageService';
import {RoomService} from "../../service/messenger/RoomService";
import {User} from "../../model/User";
import MessengerFooter from "./footer/MessengerFooter";
import MessagesList from "./messages/MessagesList";
import ListItemButton from '@mui/material/ListItemButton';
import {MessengerService} from "../../service/messenger/MessengerService";
import {Room} from "../../model/messenger/room/Room";
import MessengerMenu from "./menu/MessengerMenu";


const Messenger: React.FC<TProps> = (props) => {
    const [messageText, setMessageText] = useState<string>('');
    const [selectedRoom, setSelectedRoom] = useState<Room>(null);
    const [editedMessage, setEditedMessage] = useState<MessageEntity>(null);
    const dispatch = useAppDispatch();
    const currentUserId = retrieveUserId();

    useEffect(() => {
        props.messengerInitialization();
    }, [props.messengerInitialization]);

    useEffect(() => {
        const element = document.getElementById('list');
        element.scrollTop = element.scrollHeight;
        MessengerService.retrieveRoomTitle(selectedRoom)
    }, [props.messages]);

    return (
        <div className={style.wrapper}>
            <Grid container component={Paper} className={style.chatSection}>
                <Grid item xs={3} className={style.room_container}>
                    <AsyncSelect loadOptions={promiseOptions}
                                 getOptionLabel={generateOptionLabel}
                                 getOptionValue={s => s.toString()}
                                 maxMenuHeight={350}
                                 onChange={option => console.log(option)}
                    />
                    <Divider/>
                    <List>
                        {props.rooms.map(room => (
                            <ListItemButton key={room.id}
                                            onClick={() => MessengerService.fetchMessages(room, dispatch, setSelectedRoom, props.messages, props.roomMembers)}>
                                <ListItemText className={style.unread_message_text}>{room.amount}</ListItemText>
                                <ListItemText>{MessengerService.retrieveRoomTitle(room)}</ListItemText>
                            </ListItemButton>
                        ))}
                    </List>
                </Grid>
                <Grid container direction={'column'} item xs={9} className={style.message_container}>
                    <Grid container item className={style.room_title_container}>
                        <Grid item xs={11} className={style.room_title}>
                            <strong>{MessengerService.retrieveRoomTitle(selectedRoom)}</strong>
                        </Grid>

                        <Grid item xs={1} className={style.room_title}>
                            <MessengerMenu/>
                        </Grid>
                    </Grid>

                    <MessagesList currentUserId={currentUserId} selectedRoom={selectedRoom}
                                  setEditedMessage={setEditedMessage} setMessageText={setMessageText}/>

                    <MessengerFooter editedMessage={editedMessage} messageText={messageText} selectedRoom={selectedRoom}
                                     setEditedMessage={setEditedMessage} setMessageText={setMessageText}
                    />

                </Grid>
            </Grid>
        </div>
    );
}

function fetchMessages(roomId: number,
                       dispatch: AppDispatch,
                       setRoomId: Dispatch<SetStateAction<number>>,
                       messages: Immutable.Map<number, MessageEntity[]>,
                       roomMembers: Immutable.Map<number, User[]>
) {
    Promise.all([
        MessageService.getMessageHistory(roomId, 0, 20),
        RoomService.getUsersOfRoom(roomId)
    ]).then(([messagesResp, usersResp]) => {
        setRoomId(roomId);

        const roomMembersMap = new Map(roomMembers).set(roomId, usersResp.data);
        dispatch(setRoomMembersToState(Immutable.Map(roomMembersMap)));

        const messagesMap = new Map(messages).set(roomId, messagesResp.data.content.reverse());
        dispatch(setMessagesToState(Immutable.Map(messagesMap)));
    })
}

function generateMessageInfo(message: MessageEntity, roomMembers: User[]) {
    const messageDate = new Date(message.createdAt).toLocaleTimeString();
    return `${messageDate} | ${message.senderTitle}`;
}

function promiseOptions(inputValue: string): Promise<ChatSearchOption[]> {
    let rooms = RoomService.findRoomsWithSpecificUser(inputValue, RoomType.PRIVATE);
    let users = findUsersPerPage(0, 20, {title: inputValue})
    return Promise.all([rooms, users]).then(
        ([rooms, users]) => {
            let options: ChatSearchOption[] = new Array<ChatSearchOption>();
            options = options.concat(rooms.data.map(room => new ChatSearchOption(ChatSearchOptionType.ROOM, room)));
            options = options.concat(users.data.content.map(user => new ChatSearchOption(ChatSearchOptionType.USER, user)));
            return options;
        }
    )
}

function usersIHaveAlreadyHadPrivateChatsWithIds(myPrivateRooms: SearchRoom[]) {
    const userIds = new Array<number>();
}

function generateOptionLabel(option: ChatSearchOption) {

    switch (option.type) {
        case ChatSearchOptionType.ROOM:
            let s = generateRoomTitle(option.payload as SearchRoom);
            console.log(s);
            return s;

        case ChatSearchOptionType.USER:
            return 'Start chat with: ' + option.payload.title;

        default:
            return 'Unexpected option type';
    }
}

function generateRoomTitle(room: SearchRoom) {
    if (room.roomType === RoomType.PRIVATE) {
        let myId = jwtDecode<DecodedJwtToken>(sessionStorage.getItem('auth_token')).user_id;
        return 'Existing chat: ' + JSON.parse(room.title)
            .map((s: string) => s.split(':'))
            .filter((s: string) => parseInt(s[0]) !== myId)[0][1]
    } else {
        return 'Unexpected room type';
    }
}


const mapStateToProps = (state: AppState) => ({
    rooms: state.messenger.rooms,
    messages: state.messenger.messages,
    roomMembers: state.messenger.roomMembers
})

const mapDispatchToProps = {
    messengerInitialization
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

export default connector(Messenger);
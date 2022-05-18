import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid/Grid';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import Paper from '@mui/material/Paper/Paper';
import TextField from '@mui/material/TextField/TextField';
import React, {useEffect, useState} from 'react';
import style from './Messenger.module.css'
import {AppState, useAppDispatch} from "../../index";
import {connect, ConnectedProps} from "react-redux";
import {MessageEntity} from "../../model/messenger/message/MessageEntity";
import {messengerInitialization} from "../../redux/messenger/messengerActions";
import {retrieveUserId} from "../../service/authService";
import {Room} from "../../model/messenger/room/Room";
import ListItemButton from '@mui/material/ListItemButton';
import MessengerFooter from "./footer/MessengerFooter";
import MessagesList from "./messages/MessagesList";
import {MessengerService} from "../../service/messenger/MessengerService";

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
                    <Grid item xs={12} style={{padding: '10px'}}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth/>
                    </Grid>
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
                    <Grid item className={style.room_title}>
                        <strong>{MessengerService.retrieveRoomTitle(selectedRoom)}</strong>
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
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid/Grid';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import Paper from '@mui/material/Paper/Paper';
import React, {useEffect, useState} from 'react';
import style from './Messenger.module.css'
import {AppState, useAppDispatch} from "../../index";
import {connect, ConnectedProps} from "react-redux";
import {MessageEntity} from "../../model/messenger/message/MessageEntity";
import {messengerInitialization} from "../../redux/messenger/messengerActions";
import {retrieveUserId} from "../../service/authService";
import AsyncSelect from "react-select/async";
import {ChatSearchOption, ChatSearchOptionType} from "../../model/messenger/chatSearchOptiom/ChatSearchOption";
import MessengerFooter from "./footer/MessengerFooter";
import MessagesList from "./messages/MessagesList";
import ListItemButton from '@mui/material/ListItemButton';
import {MessengerService} from "../../service/messenger/MessengerService";
import {Room} from "../../model/messenger/room/Room";
import MessengerMenu from "./menu/MessengerMenu";
import EditTitleModal from "./menu/edit-title/EditTitleModal";
import { components } from 'react-select/dist/declarations/src/components';


const Messenger: React.FC<TProps> = (props) => {
    const [messageText, setMessageText] = useState<string>('');
    const [selectedRoom, setSelectedRoom] = useState<Room>(null);
    const [editedMessage, setEditedMessage] = useState<MessageEntity>(null);
    const [selectValue, setSelectValue] = useState<ChatSearchOption>(null);
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

    const onChange = (option: ChatSearchOption) => {
        if (option.type === ChatSearchOptionType.ROOM) {
            MessengerService.fetchMessages(option.payload as Room, dispatch, setSelectedRoom, props.messages, props.roomMembers);
            setSelectValue(null);
        } else {
            MessengerService.createPrivateRoomWith(option.payload.id);
            setSelectValue(null);
        }
    }

    // const NoOptionsMessage = (props: any) => {
    //     return (
    //         <components.NoOptionsMessage {...props}>
    //             <span className="custom-css-class">Text</span>
    //         </components.NoOptionsMessage>
    //     );
    // };

    return (
        <div className={style.wrapper}>
            <Grid container component={Paper} className={style.chatSection}>
                <Grid item xs={3} className={style.room_container}>
                    <AsyncSelect loadOptions={MessengerService.promiseOptions}
                                 getOptionLabel={MessengerService.generateOptionLabel}
                                 getOptionValue={s => s.toString()}
                                 maxMenuHeight={500}
                                 onChange={onChange}
                                 value={selectValue}
                                 placeholder={'Search...'}
                                 noOptionsMessage={({inputValue}) => inputValue ? "No results found" : ""}
                    />
                    <Divider/>
                    <List className={style.room_list}>
                        {props.rooms.map(room => (
                            <ListItemButton key={room.id}
                                            onClick={() => MessengerService.fetchMessages(room, dispatch, setSelectedRoom, props.messages, props.roomMembers)}>
                                <ListItemText className={style.unread_message_text}>{room.amount}</ListItemText>
                                <ListItemText>{MessengerService.retrieveRoomTitle(room)}</ListItemText>
                            </ListItemButton>
                        ))}

                    </List>
                </Grid>
                <Grid container direction={'column'} item xs={9}>
                    <Grid container item className={style.room_title_container}>
                        <Grid item xs={11} className={style.room_title}>
                            <strong>{MessengerService.retrieveRoomTitle(selectedRoom)}</strong>
                        </Grid>

                        <Grid item xs={1} className={style.room_title}>
                            <MessengerMenu selectedRoom={selectedRoom}/>
                        </Grid>
                    </Grid>

                    <MessagesList currentUserId={currentUserId} selectedRoom={selectedRoom}
                                  setEditedMessage={setEditedMessage} setMessageText={setMessageText}/>

                    <MessengerFooter editedMessage={editedMessage} messageText={messageText} selectedRoom={selectedRoom}
                                     setEditedMessage={setEditedMessage} setMessageText={setMessageText}
                    />

                </Grid>
            </Grid>

            <EditTitleModal selectedRoom={selectedRoom}/>

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
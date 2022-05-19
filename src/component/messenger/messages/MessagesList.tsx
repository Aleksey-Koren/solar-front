import Grid from "@mui/material/Grid/Grid";
import List from "@mui/material/List";
import style from "../Messenger.module.css";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import {IconButton} from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Divider from "@mui/material/Divider";
import React, {Dispatch, SetStateAction} from "react";
import {useAppSelector} from "../../../index";
import {Room} from "../../../model/messenger/room/Room";
import {MessageEntity} from "../../../model/messenger/message/MessageEntity";
import {MessengerService} from "../../../service/messenger/MessengerService";

interface MessagesListProps {
    selectedRoom: Room;
    currentUserId: number;
    setEditedMessage: Dispatch<SetStateAction<MessageEntity>>;
    setMessageText: Dispatch<SetStateAction<string>>;
}

function MessagesList(props: MessagesListProps) {
    const messages = useAppSelector(state => state.messenger.messages);


    const createEditIcon = (message: MessageEntity) => (
        props.currentUserId === message.senderId &&
        <IconButton className={style.message_edit_button}
                    onClick={() => {
                        props.setEditedMessage(message);
                        props.setMessageText(message.message)
                    }}>
            <BorderColorIcon fontSize={"small"}/>
        </IconButton>
    );

    return (
        <Grid item>
            <List className={style.message_list} id={'list'}>
                {messages.get(props.selectedRoom?.id)?.map(message => (
                    <ListItem key={message.id}>
                        <Grid container>
                            <Grid item xs={12}>
                                <div className={style.message_div} style={{
                                    float: (message.senderId === props.currentUserId ? 'right' : 'left'),
                                    background: (message.senderId === props.currentUserId ? 'lightgreen' : 'grey')
                                }}>
                                    <ListItemText>
                                        <span className={style.message_info}>
                                            {createEditIcon(message)}
                                            {MessengerService.generateMessageInfo(message)}
                                        </span>
                                    </ListItemText>

                                    <ListItemText>
                                        <span className={style.message}>{message.message}</span>
                                    </ListItemText>
                                </div>
                            </Grid>
                        </Grid>
                    </ListItem>
                ))}
            </List>
            <Divider/>
        </Grid>
    );
}


export default MessagesList;
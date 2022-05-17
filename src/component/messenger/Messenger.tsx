import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem/ListItem';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import Paper from '@mui/material/Paper/Paper';
import TextField from '@mui/material/TextField/TextField';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import Fab from '@mui/material/Fab/Fab';
import style from './Messenger.module.css'
import {AppDispatch, AppState, useAppDispatch} from "../../index";
import {connect, ConnectedProps} from "react-redux";
import {MessageEntity} from "../../model/messenger/message/MessageEntity";
import {MessageService} from "../../service/messenger/MessageService";
import {RoomService} from "../../service/messenger/RoomService";
import {sendMessage} from "../../http/webSocket";
import {fetchRooms, setMessagesToState} from "../../redux/messenger/messengerActions";
import Immutable from 'immutable';


const Messenger: React.FC<TProps> = (props) => {

    useEffect(() => {
        props.fetchRooms();
    }, [])

    const [messageText, setMessageText] = useState<string>('');
    const [roomId, setRoomId] = useState<number>(null);
    const dispatch = useAppDispatch();

    return (
        <div className={style.div}>
            <Grid container component={Paper} className={style.chatSection}>
                <Grid item xs={3} className={style.borderRight500}>
                    {/*<List>*/}
                    {/*    <ListItem button key="RemySharp">*/}
                    {/*        <ListItemIcon>*/}
                    {/*            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg"/>*/}
                    {/*        </ListItemIcon>*/}
                    {/*        <ListItemText primary="John Wick"></ListItemText>*/}
                    {/*    </ListItem>*/}
                    {/*</List>*/}
                    {/*<Divider/>*/}
                    <Grid item xs={12} style={{padding: '10px'}}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth/>
                    </Grid>
                    <Divider/>
                    <List>
                        {props.rooms.map(room => (
                            <ListItem button key={room.id}
                                      onClick={() => fetchMessages(room.id, dispatch, setRoomId, props.messages)}>
                                <ListItemText>{room.amount}</ListItemText>
                                <ListItemText>{room.title}</ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid container direction={'column'} item xs={9}>
                    <Grid item className={style.messageArea}>
                        <List className={style.list}>

                            {props.messages.get(roomId)?.map(s => (
                                <ListItem key={s.id}>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <ListItemText>{`${s.createdAt} | ${s.senderId}`}</ListItemText>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <ListItemText>{s.message}</ListItemText>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            ))}

                        </List>
                        <Divider/>
                    </Grid>

                    <Grid item className={style.bottom_div}>
                        <Grid container className={style.bottom_div_div}>
                            <Grid item xs={11}>
                                <TextField className={style.text_field}
                                           placeholder="Type your message"
                                           fullWidth
                                           value={messageText}
                                           onChange={(event) => setMessageText(event.target.value)}
                                />
                            </Grid>

                            <Grid item xs={1}>
                                <Fab className={style.icon}
                                     size={"large"}
                                     onClick={() => {
                                         sendMessage(roomId, 2, messageText);
                                         setMessageText('');
                                     }}
                                >
                                    <SendIcon/>
                                </Fab>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

function fetchMessages(roomId: number,
                       dispatch: AppDispatch,
                       setRoomId: Dispatch<SetStateAction<number>>,
                       messages: Immutable.Map<number, MessageEntity[]>
) {
    Promise.all([
        MessageService.getMessageHistory(roomId, 0, 20),
        RoomService.getUsersOfRoom(roomId)
    ]).then(([messagesResp, usersResp]) => {
        setRoomId(roomId);
        const map = new Map(messages).set(roomId, messagesResp.data.content.reverse());
        dispatch(setMessagesToState(Immutable.Map(map)));
    })
}

const mapStateToProps = (state: AppState) => ({
    rooms: state.messenger.rooms,
    messages: state.messenger.messages
})

const mapDispatchToProps = {
    fetchRooms
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

export default connector(Messenger);
import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {Dialog, IconButton, ListItem, ListItemIcon, Toolbar, Typography} from "@mui/material";
import AppBar from "@mui/material/AppBar/AppBar";
import CloseIcon from "@mui/icons-material/Close";
import style from './ParticipantsListModal.module.css'
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {AppState} from "../../../../index";
import {Room} from "../../../../model/messenger/room/Room";
import {setParticipantsListModalOpen} from "../../../../redux/messenger/messengerActions";
import {retrieveUserId} from "../../../../service/authService";
import {RoomService} from "../../../../service/messenger/room/RoomService";

const ParticipantsListModal: React.FC<Props> = (props) => {

    return (
        <Dialog open={props.isOpen} maxWidth="sm" fullWidth>
            <AppBar classes={{root: style.dialog__app_bar}}>
                <Toolbar>
                    <IconButton onClick={() => props.setParticipantsListModalOpen(false)}>
                        <CloseIcon fontSize={'large'} classes={{root: style.dialog__close_icon}}/>
                    </IconButton>
                    <Typography variant="h4" component="div" flex={1} mx={3} align={"center"}>
                        {props.roomMembers.get(props.selectedRoom?.id)?.length} members
                    </Typography>
                </Toolbar>
            </AppBar>
            <List dense sx={{width: '100%'}} className={style.dialog__participants_list}>
                {props.roomMembers.get(props.selectedRoom?.id)?.map((member) => (
                    <ListItem
                        key={member.id}
                        secondaryAction={
                            props.roomOwnerId === retrieveUserId() && props.roomOwnerId !== member.id && (
                                <IconButton
                                    onClick={() => RoomService.kickUserFromRoom(props.selectedRoom?.id, member.id)}>
                                    <RemoveCircleIcon className={style.dialog__remove_icon}/>
                                </IconButton>
                            )
                        }
                    >
                        <ListItemIcon>
                            {props.roomOwnerId === member.id
                                ? <StarIcon fontSize={"medium"} className={style.dialog__star_icon}/>
                                : <PersonIcon fontSize={"medium"} className={style.dialog__person_icon}/>
                            }
                        </ListItemIcon>
                        <ListItemText>
                            <p className={style.dialog__person_title}>{member.title}</p>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

const mapStateToProps = (state: AppState, ownProps: { selectedRoom: Room }) => ({
    isOpen: state.messenger.isParticipantsListModalOpen,
    roomMembers: state.messenger.roomMembers,
    selectedRoom: ownProps.selectedRoom,
    roomOwnerId: ownProps.selectedRoom?.ownerId
})

const mapDispatchToProps = {
    setParticipantsListModalOpen,
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>

export default connector(ParticipantsListModal);
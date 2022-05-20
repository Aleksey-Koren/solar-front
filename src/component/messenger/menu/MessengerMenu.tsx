import {IconButton, Menu, MenuItem} from "@mui/material";
import {useState} from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';

import {Room} from "../../../model/messenger/room/Room";
import {RoomType} from "../../../model/messenger/room/RoomType";
import {useAppDispatch} from "../../../index";
import {setEditTitleOpen, setParticipantsListModalOpen} from "../../../redux/messenger/messengerActions";
import {IPlainDataAction} from "../../../redux/redux-types";

interface MessengerMenuProps {
    selectedRoom: Room;
}


function MessengerMenu(props: MessengerMenuProps) {
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useAppDispatch();

    const onMenuItemClick = (dispatchAction: (isOpen: boolean) => IPlainDataAction<boolean>) => {
        setAnchorEl(null);
        dispatch(dispatchAction(true))
    }

    return (
        <div>
            <IconButton onClick={(event: any) => setAnchorEl(event.currentTarget)}>
                <MoreVertIcon/>
            </IconButton>
            <Menu
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
            >
                {props.selectedRoom?.roomType === RoomType.PUBLIC &&
                    <div>
                        <MenuItem onClick={() => onMenuItemClick(setEditTitleOpen)}>
                            <EditIcon style={{marginRight: '10px'}} fontSize={"medium"}/>
                            Edit Title
                        </MenuItem>

                        <MenuItem>
                            <AddIcon fontSize={'medium'} style={{marginRight: '10px'}}/>
                            Add member
                        </MenuItem>

                        <MenuItem onClick={() => onMenuItemClick(setParticipantsListModalOpen)}>
                            <ListIcon style={{marginRight: '10px'}} fontSize={"medium"}/>
                            Members
                        </MenuItem>
                    </div>
                }
            </Menu>
        </div>
    );
}

export default MessengerMenu;
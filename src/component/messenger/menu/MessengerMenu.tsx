import {IconButton, Menu, MenuItem} from "@mui/material";
import {useState} from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import {Room} from "../../../model/messenger/room/Room";
import {RoomType} from "../../../model/messenger/room/RoomType";
import {useAppDispatch} from "../../../index";
import {setEditTitleOpen, setIsAddUsersModalOpened} from "../../../redux/messenger/messengerActions";

interface MessengerMenuProps {
    selectedRoom: Room;
}


function MessengerMenu(props: MessengerMenuProps) {
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useAppDispatch();

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
                    <>
                        <MenuItem onClick={() => {
                            setAnchorEl(null);
                            dispatch(setEditTitleOpen(true))
                        }}>
                            <EditIcon style={{marginRight: '10px'}}/>
                            Edit Title
                        </MenuItem>
                        <MenuItem key={2}
                                  style={{paddingRight: '50px'}}
                                  onClick={() => {
                                      dispatch(setIsAddUsersModalOpened(true));
                                      setAnchorEl(null);
                                  }}
                        >
                            <AddIcon fontSize={'large'} style={{marginRight: '10px', width: '40px'}}/>
                            Add members
                        </MenuItem>
                    </>
                }
            </Menu>
        </div>
    );
}

export default MessengerMenu;
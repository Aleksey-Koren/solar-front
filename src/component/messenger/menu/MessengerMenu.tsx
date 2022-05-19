import {IconButton, Menu, MenuItem} from "@mui/material";
import {useState} from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import {Room} from "../../../model/messenger/room/Room";
import {RoomType} from "../../../model/messenger/room/RoomType";
import {useAppDispatch} from "../../../index";
import {setEditTitleOpen} from "../../../redux/messenger/messengerActions";

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
                    <MenuItem onClick={() => {
                        setAnchorEl(null);
                        dispatch(setEditTitleOpen(true))
                    }}>
                        <EditIcon style={{marginRight: '10px'}}/>
                        Edit Title
                    </MenuItem>
                }
            </Menu>
        </div>
    );
}

export default MessengerMenu;
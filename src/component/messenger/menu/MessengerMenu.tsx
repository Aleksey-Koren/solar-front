import {IconButton, Menu, MenuItem} from "@mui/material";
import {useState} from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';


function MessengerMenu() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton onClick={handleClick}>
                <MoreVertIcon/>
            </IconButton>
            <Menu
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem key={1} onClick={handleClose} style={{paddingRight: '50px'}}>
                    <EditIcon style={{marginRight: '10px', width: '40px'}}/>
                    Edit
                </MenuItem>
                <MenuItem key={2} onClick={handleClose} style={{paddingRight: '50px'}}>
                    <AddIcon fontSize={'large'} style={{marginRight: '10px', width: '40px'}}/>
                    Add member
                </MenuItem>
                <MenuItem key={2} onClick={handleClose} style={{paddingRight: '50px'}}>
                    Members
                </MenuItem>
            </Menu>
        </div>
    );
}

export default MessengerMenu;
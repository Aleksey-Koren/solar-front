import './Navbar.css'
import {Link} from "react-router-dom";
import Button from '@mui/material/Button/Button';
import {Menu, MenuItem} from "@mui/material";
import React from "react";

function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={"navbar"}>
            <Link className={"navbar__link"} to={"/"}>Star Map</Link>
            <Link className={"navbar__link"} to={"/"}>Dashboard</Link>
            <Button
                onMouseOver={handleClick}
                onMouseLeave={() => console.log('leave button')}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                Config
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
            <button className={"logout_button"}>Logout</button>
        </div>
    );
}

export default Navbar;
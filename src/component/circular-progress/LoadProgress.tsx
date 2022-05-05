import {CircularProgress} from "@mui/material";
import React from "react";
import style from './LoadProgress.module.css'

function LoadProgress() {

    return (
        <div className={style.circular_progress}>
            <CircularProgress/>
        </div>
    );
}

export default LoadProgress;
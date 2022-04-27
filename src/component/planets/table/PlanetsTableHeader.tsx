import {TableCell, TableHead, TableRow} from "@mui/material";
import React from "react";
import style from '../Planets.module.css'

function PlanetsTableHeader() {
    return (
        <TableHead>
            <TableRow>
                <TableCell classes={{head: style.MuiTableCell_head}} align="center"> Title </TableCell>
                <TableCell classes={{head: style.MuiTableCell_head}} align="center"> Angle </TableCell>
                <TableCell classes={{head: style.MuiTableCell_head}} align="center"> Mean Radius </TableCell>
                <TableCell classes={{head: style.MuiTableCell_head}} align="center"> Aphelion(1000 km )</TableCell>
                <TableCell classes={{head: style.MuiTableCell_head}} align="center"> Orbital Period(days) </TableCell>
            </TableRow>
        </TableHead>
    );
}

export default PlanetsTableHeader;
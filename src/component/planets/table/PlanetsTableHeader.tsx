import {TableCell, TableHead, TableRow} from "@mui/material";
import React from "react";
import '../Planets.css'

function PlanetsTableHeader() {
    return (
        <TableHead>
            <TableRow>
                <TableCell align="center"> Title </TableCell>
                <TableCell align="center"> Angle </TableCell>
                <TableCell align="center"> Mean Radius </TableCell>
                <TableCell align="center"> Aphelion(1000 km )</TableCell>
                <TableCell align="center"> Orbital Period(days) </TableCell>
            </TableRow>
        </TableHead>
    );
}

export default PlanetsTableHeader;
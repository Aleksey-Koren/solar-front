import {TableBody, TableCell, TableRow} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {IState} from "../../../index";
import {Planet} from "../../../model/planet/Planet";
import '../Planets.css'

function PlanetsTableBody() {
    let planets: Planet[];

    useSelector((state: IState) => planets = state.planets.planets);

    return (
        <TableBody>
            {planets.map(planet => (
                <TableRow key={planet.id}>
                    <TableCell align="center">{planet.title}</TableCell>
                    <TableCell align="center">{planet.angle}</TableCell>
                    <TableCell align="center">{planet.meanRadius}</TableCell>
                    <TableCell align="center">{planet.aphelion}</TableCell>
                    <TableCell align="center">{planet.orbitalPeriod}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

export default PlanetsTableBody;
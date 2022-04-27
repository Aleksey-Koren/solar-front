import {TableBody, TableCell, TableRow} from "@mui/material";
import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {IState} from "../../../index";
import '../Planets.module.css'
import {Link} from "react-router-dom";
import style from "../Planets.module.css";
import {hideMoonsModal} from "../../../redux/planets/planetActions";

const PlanetsTableBody: React.FC<Props> = (props) => {
    const onLinkClick = () => props.isMoonsModalOpen ? props.hideMoonsModal() : null;

    return (
        <TableBody>
            {props.planets.map(planet => (
                <TableRow key={planet.id}>
                    <TableCell classes={{body: style.MuiTableCell_body}}>
                        <Link to={'/planet-form'} state={planet} onClick={onLinkClick}>{planet.title}</Link>
                    </TableCell>
                    <TableCell classes={{body: style.MuiTableCell_body}}>{planet.angle}</TableCell>
                    <TableCell classes={{body: style.MuiTableCell_body}}>{planet.meanRadius}</TableCell>
                    <TableCell classes={{body: style.MuiTableCell_body}}>{planet.aphelion}</TableCell>
                    <TableCell classes={{body: style.MuiTableCell_body}}>{planet.orbitalPeriod}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

const mapStateToProps = (state: IState) => ({
    planets: state.planets.planets,
    isMoonsModalOpen: state.planets.isMoonsModalOpen
})

const mapDispatchToProps = {
    hideMoonsModal
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(PlanetsTableBody);

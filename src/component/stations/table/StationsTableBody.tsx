import {AppState} from "../../../index";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect} from "react";
import {findStationsActionCreator} from "../../../redux/stations/stationActions";
import {TableBody, TableCell, TableRow} from "@mui/material";
import {StationForTable} from "../../../model/station/StationForTable";
import {Link} from "react-router-dom";
import styles from "./stationTable.module.css";

const StationsTableBody: React.FC<TProps> = (props) => {

    return (
            <TableBody>
                {props.stations.map((station: StationForTable) =>
                    <TableRow key={station.id}>
                        <TableCell className={styles.tableCell_body}>{station.title}</TableCell>
                        <TableCell className={styles.tableCell_body}>{station.type}</TableCell>
                        <TableCell className={styles.tableCell_body}>{station.planet}</TableCell>
                        <TableCell className={styles.tableCell_body}>{station.user}</TableCell>
                        <TableCell className={styles.tableCell_body}>{station.money}</TableCell>
                        <TableCell className={styles.tableCell_body}>{station.population}</TableCell>
                        <TableCell className={styles.tableCell_body}>
                            <Link to={"/nowhere"}>Edit Station</Link>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
    )
}

const mapStateToProps = (state: AppState) => ({
    stations: state.stations.stations,
    page: state.stations.currentPage,
    pageSize: state.stations.itemsPerPage,
})

const mapDispatchToProps = {
    findStationsActionCreator
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

export default connector(StationsTableBody);
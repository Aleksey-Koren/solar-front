import React, {useEffect} from "react";
import {AppState} from "../../../index";
import {connect, ConnectedProps} from "react-redux";
import StationsTableHead from "./StationsTableHead";
import StationsTableBody from "./StationsTableBody";
import {findStationsActionCreator} from "../../../redux/stations/stationActions";
import {Table, TableContainer} from "@mui/material";
import styles from "./stationTable.module.css";

const StationsTable: React.FC<Props> = (props) => {



    return (
            <TableContainer className={styles.table_container}>
                <Table>
                    <StationsTableHead/>
                    <StationsTableBody/>
                </Table>
            </TableContainer>
    )
}

const mapStateToProps = (state: AppState) => ({

})

const mapDispatchToProps = {

}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(StationsTable);

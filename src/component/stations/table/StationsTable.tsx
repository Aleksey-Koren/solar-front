import React, {useEffect} from "react";
import StationsTableHead from "./StationsTableHead";
import StationsTableBody from "./StationsTableBody";
import {Table, TableContainer} from "@mui/material";
import styles from "../../global-styles/MUITable.module.css";
import StationsTableFooter from "./StationsTableFooter";
import {useParams} from "react-router-dom";

const StationsTable: React.FC = () => {

    return (
            <TableContainer className={styles.table_container}>
                <Table>
                    <StationsTableHead/>
                    <StationsTableBody/>
                    <StationsTableFooter/>
                </Table>
            </TableContainer>
    )
}

export default StationsTable;

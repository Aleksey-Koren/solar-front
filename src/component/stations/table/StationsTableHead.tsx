import React from "react";
import {TableCell, TableHead, TableRow} from "@mui/material";
import styles from "./stationTable.module.css";

const StationsTableHead: React.FC = () => {
    return (
        <TableHead>
            <TableRow>
                <TableCell className={styles.tableCell_head}>Title</TableCell>
                <TableCell className={styles.tableCell_head}>Type</TableCell>
                <TableCell className={styles.tableCell_head}>Planet</TableCell>
                <TableCell className={styles.tableCell_head}>Owner</TableCell>
                <TableCell className={styles.tableCell_head}>Money balance:</TableCell>
                <TableCell className={styles.tableCell_head}>Population</TableCell>
                <TableCell className={styles.tableCell_head}/>
            </TableRow>
        </TableHead>
    )
}

export default StationsTableHead;

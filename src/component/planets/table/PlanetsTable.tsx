import {Table, TableContainer} from "@mui/material";
import planetsStyle from "../Planets.module.css";
import CustomTableHeader from "../../global-components/table/CustomTableHeader";
import PlanetsTableBody from "./PlanetsTableBody";
import PlanetsTableFooter from "./PlanetsTableFooter";
import React from "react";

function PlanetsTable() {

    return (
        <TableContainer classes={{root: planetsStyle.MuiTableContainer_root}}>
            <Table>
                <CustomTableHeader
                    tableHeaderTitles={['Title', 'Angle', 'Mean Radius', 'Aphelion(1000km)', 'Orbital Period(days)']}/>
                <PlanetsTableBody/>
                <PlanetsTableFooter/>
            </Table>
        </TableContainer>
    )
}

export default PlanetsTable
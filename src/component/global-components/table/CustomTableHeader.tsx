import {TableCell, TableHead, TableRow} from "@mui/material";
import globalStyle from "../../global-styles/MUITable.module.css";
import React from "react";

interface CustomTableHeaderProps {
    tableHeaderTitles: string[];
}

function CustomTableHeader(props: CustomTableHeaderProps) {

    return (
        <TableHead className={globalStyle.MuiTableCell_head}>
            <TableRow>
                {props.tableHeaderTitles.map(title => (
                    <TableCell classes={{head: globalStyle.MuiTableCell_head}} align="center">{title}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default CustomTableHeader;
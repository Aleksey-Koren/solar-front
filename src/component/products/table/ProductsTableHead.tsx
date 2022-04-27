import {TableCell, TableHead, TableRow} from "@mui/material";
import styles from "../styles.module.css";
import React from "react";
import {IState} from "../../../index";
import {fetchProductsAction} from "../../../redux/products/productActions";
import {connect, ConnectedProps} from "react-redux";


const ProductsTableHead: React.FC = () => {

    return (
        <TableHead>
            <TableRow>
                <TableCell classes={{root: styles.tableCell_head_root}}>Title</TableCell>
                <TableCell classes={{root: styles.tableCell_head_root}}>Image</TableCell>
                <TableCell classes={{root: styles.tableCell_head_root}}>Bulk</TableCell>
                <TableCell classes={{root: styles.tableCell_head_root}}>Mass</TableCell>
                <TableCell classes={{root: styles.tableCell_head_root}}>Price</TableCell>
                <TableCell classes={{root: styles.tableCell_head_root}}>Volume</TableCell>
            </TableRow>
        </TableHead>
    )
}



export default ProductsTableHead;
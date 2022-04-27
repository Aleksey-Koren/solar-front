import {IState} from "../../../index";
import {connect, ConnectedProps} from "react-redux";
import React from "react";
import {TableBody, TableCell, TableRow} from "@mui/material";
import styles from "../styles.module.css";

const ProductsTableBody: React.FC<Props> = (props) => {
    return (
        <TableBody>
            {props.products.map(product =>
                <TableRow key={product.id}>
                    <TableCell classes={{root: styles.tableCell_body_root}}>{product.title}</TableCell>
                    <TableCell classes={{root: styles.tableCell_body_root}}>{product.image}</TableCell>
                    <TableCell classes={{root: styles.tableCell_body_root}}>{product.bulk}</TableCell>
                    <TableCell classes={{root: styles.tableCell_body_root}}>{product.mass}</TableCell>
                    <TableCell classes={{root: styles.tableCell_body_root}}>{product.price}</TableCell>
                    <TableCell classes={{root: styles.tableCell_body_root}}>{product.volume}</TableCell>
                </TableRow>
            )}
        </TableBody>
    )
}

const mapStateToProps = (state: IState) => ({
    products: state.products.products,
})

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(ProductsTableBody);
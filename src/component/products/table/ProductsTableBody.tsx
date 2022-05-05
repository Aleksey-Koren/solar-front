import {connect, ConnectedProps} from "react-redux";
import React from "react";
import {TableBody, TableCell, TableRow} from "@mui/material";
import styles from "../styles.module.css";
import {goToEditProductAction} from "../../../redux/products/productActions";
import {AppState} from "../../../index";

const ProductsTableBody: React.FC<Props> = (props) => {
    // const state = useSelector();

    return (
        <TableBody>
            {props.products.map(product =>
                <TableRow key={product.id}>
                    <TableCell classes={{root: styles.tableCell_body_root}}>
                        <span className={styles.title_column_text}
                            onClick={event => props.goToEditProduct(product.id)}
                        >
                            {product.title}
                        </span>
                    </TableCell>
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

const mapStateToProps = (state: AppState) => ({
    products: state.products.products,
})

const mapDispatchToProps = {
    goToEditProduct: goToEditProductAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(ProductsTableBody);
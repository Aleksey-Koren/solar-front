import {connect, ConnectedProps} from "react-redux";
import {IState} from "../../../index";
import {TableFooter, TablePagination, TableRow} from "@mui/material";
import styles from "../styles.module.css";
import React from "react";
import {fetchProductsAction} from "../../../redux/products/productActions";

const ProductsTableFooter: React.FC<Props> = (props) => {

    const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        props.fetchProductsAction(page, props.productsPerPage);
    }

    const onRowsPerPageChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let numberOfProducts;
        if(Number(event.target.value) === -1) {
            numberOfProducts = props.totalProducts;
        } else {
            numberOfProducts = Number(event.target.value);
        }
        props.fetchProductsAction(0, numberOfProducts);
    }

    return (
        <TableFooter>
            <TableRow>
                <TablePagination classes={{
                    root: styles.tablePagination_root,
                    spacer: styles.spacer
                }}
                                 colSpan={6}
                                 count={props.totalProducts}
                                 onPageChange={onPageChange}
                                 page={props.currentPage}
                                 rowsPerPage={props.productsPerPage}
                                 onRowsPerPageChange={onRowsPerPageChange}
                                 rowsPerPageOptions={[10, 20, {value: -1, label: 'Show All'}]}
                                 labelRowsPerPage={<span>Products per page:</span>}
                                 showFirstButton={true}
                                 showLastButton={true}
                />
            </TableRow>
        </TableFooter>
    )
}

const mapStateToProps = (state: IState) => ({
    totalProducts: state.products.totalItems,
    currentPage: state.products.currentPage,
    productsPerPage: state.products.itemsPerPage
});

const mapDispatchToProps = {
    fetchProductsAction
}

type Props = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(ProductsTableFooter);
import {connect, ConnectedProps} from "react-redux";
import Navbar from "../navbar/Navbar";
import React, {useEffect} from "react";
import {fetchProductsAction} from "../../redux/products/productActions";
import {IState} from "../../index";
import styles from './styles.module.css';
import {
    CircularProgress,
    Table,
    TableContainer,
} from "@mui/material";
import ProductsTableHead from "./table/ProductsTableHead";
import ProductsTableBody from "./table/ProductsTableBody";
import ProductsTableFooter from "./table/ProductsTableFooter";


const ProductTable: React.FC<Props> = (props) => {

    useEffect(() => {
        props.fetchProductsAction(0, props.productsPerPage);
    }, []);

    return (
        <div className={styles.container}>
            <Navbar/>
            <div className={styles.header_wrapper}>
                <h1 className={styles.header}>PRODUCTS</h1>
            </div>

            {props.isLoading
                ?
                <div className={styles.primary_content_container}>
                    <CircularProgress classes={{colorPrimary: styles.circularProgress_colorPrimary}}/>
                </div>
                : props.isError
                    ? <div className={styles.primary_content_container}><h1>Error Message</h1></div>
                    :
                    <div className={styles.primary_content_container}>
                        <TableContainer classes={{root: styles.table_container}}>
                            <Table classes={{root: styles.table}}>
                                <ProductsTableHead/>
                                <ProductsTableBody/>
                                <ProductsTableFooter/>
                            </Table>
                        </TableContainer>
                    </div>
            }
        </div>
    );
}

const mapStateToProps = (state: IState) => ({
    isLoading: state.products.isLoading,
    isError: state.products.isError,
    productsPerPage: state.products.itemsPerPage,
})

const mapDispatchToProps = {
    fetchProductsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(ProductTable);
import {connect, ConnectedProps} from "react-redux";
import Navbar from "../navbar/Navbar";
import React, {useEffect} from "react";
import {fetchProductsAction, goToCreateProductAction} from "../../redux/products/productActions";
import styles from './styles.module.css';
import {
    CircularProgress,
    Table,
    TableContainer,
} from "@mui/material";
import ProductsTableHead from "./table/ProductsTableHead";
import ProductsTableBody from "./table/ProductsTableBody";
import ProductsTableFooter from "./table/ProductsTableFooter";
import ProductsForm from "./form/ProductsForm";
import {AppState} from "../../index";


const Products = (props:Props) => {

    useEffect(() => {
        props.fetchProductsAction(0, props.productsPerPage);
    }, [fetchProductsAction, props.isProductSaved]);

    return (
        <div className={styles.container}>
            <Navbar/>
            <div className={styles.header_wrapper}>
                <h1 className={styles.header}>PRODUCTS</h1>
            </div>

            <div className={styles.primary_content_container}>

                {props.isLoading
                    ?
                    <CircularProgress classes={{colorPrimary: styles.circularProgress_colorPrimary}}/>
                    : null
                }

                {props.isError
                    ?
                    <h1>Error Message</h1>
                    : null
                }

                {props.isDisplayingTable
                    ?
                    <div>
                        <TableContainer classes={{root: styles.table_container}}>
                            <Table>
                                <ProductsTableHead/>
                                <ProductsTableBody/>
                                <ProductsTableFooter/>
                            </Table>
                        </TableContainer>
                        <button className={styles.create_button} onClick={() => props.goToCreateProductAction()}>
                            Create NEW
                        </button>
                    </div>
                    : null
                }

                {(props.isEditing || props.isCreating)
                    ?
                    <ProductsForm/>
                    : null
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    isLoading: state.products.isLoading,
    isError: state.products.isError,
    isDisplayingTable: state.products.isDisplayingTable,
    isEditing: state.products.isEditing,
    isCreating: state.products.isCreating,
    isProductSaved: state.products.isProductSaved,
    productsPerPage: state.products.itemsPerPage
})

const mapDispatchToProps = {
    fetchProductsAction,
    goToCreateProductAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(Products);
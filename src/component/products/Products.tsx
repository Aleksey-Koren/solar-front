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
import ProductsForm from "./form/ProductsForm";


const Products: React.FC<Props> = (props) => {

    useEffect(() => {
        props.fetchProductsAction(0, props.productsPerPage);
    }, [fetchProductsAction]);

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
                    <TableContainer classes={{root: styles.table_container}}>
                        <Table classes={{root: styles.table}}>
                            <ProductsTableHead/>
                            <ProductsTableBody/>
                            <ProductsTableFooter/>
                        </Table>
                    </TableContainer>
                    : null
                }

                {props.isEditing
                    ?
                    <ProductsForm/>
                    : null
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state: IState) => ({
    isLoading: state.products.isLoading,
    isError: state.products.isError,
    isDisplayingTable: state.products.isDisplayingTable,
    isEditing: state.products.isEditing,
    isCreating: state.products.isEditing,
    productsPerPage: state.products.itemsPerPage
})

const mapDispatchToProps = {
    fetchProductsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(Products);
import {connect, ConnectedProps} from "react-redux";
import Navbar from "../../navbar/Navbar";
import React, {useEffect} from "react";
import {fetchProductsAction} from "../../../redux/products/productActions";
import {IState} from "../../../index";
import styles from './styles.module.css';
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableFooter,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";


const ProductTable: React.FC<Props> = (props) => {

    useEffect(() => {
        props.fetchProductsAction(0, props.productsPerPage);
    }, []);

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

    return (<div className={styles.container}>
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
                        <Table>
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
                            <TableFooter>
                                <TableRow>
                                    <TablePagination classes={{root: styles.tablePagination_root}}
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
                        </Table>
                    </TableContainer>
                </div>
                }

        {/*<CustomTable headers={tableHeaders} data={props.products}/>*/}
    </div>);
}

const mapStateToProps = (state: IState) => ({
    isLoading: state.products.isLoading,
    products: state.products.products,
    isError: state.products.isError,
    currentPage: state.products.currentPage,
    productsPerPage: state.products.itemsPerPage,
    totalProducts: state.products.totalItems
})

const mapDispatchToProps = {
    fetchProductsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(ProductTable);
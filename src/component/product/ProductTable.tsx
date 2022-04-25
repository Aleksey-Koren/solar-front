import {connect, ConnectedProps} from "react-redux";
import Navbar from "../navbar/Navbar";
import {fetchProducts} from "../../service/productService";
import React, {useEffect} from "react";
import {fetchProductsAction} from "./productActions";
import {IState} from "../../index";
import './styles.css';
import {CustomTable, IColumnDescription} from "../custom_table/CustomTable";

const ProductTable: React.FC<Props> = (props) => {

    useEffect(() => {
        props.fetchProductsAction(0, 2);
    }, []);

    let tableHeaders: Array<IColumnDescription> = [
        {dataField: "id", text: "Id", hidden: true},
        {dataField: "title", text: "Title"},
        {dataField: "image", text: "Image"},
        {dataField: "bulk", text: "Bulk"},
        {dataField: "mass", text: "Mass"},
        {dataField: "price", text: "Price"},
        {dataField: "volume", text: "Volume"}
    ];


    return (<div>
        <Navbar/>
        {/*{props.isPending === true ? <h1>Loading...</h1>: null}*/}

        {/*    {props.products.length > 0 && !props.isPending && !props.error*/}
        {/*    ?*/}
        {/*        props.products.map(s => {return <p>{s.title}</p>})*/}
        {/*    :*/}
        {/*        null}*/}

        {/*{props.error ? <h1>Error</h1> : null}*/}
        <CustomTable headers={tableHeaders} data={props.products}/>
    </div>);
}

const mapStateToProps = (state: IState) => ({
    isPending: state.products.isPending,
    products: state.products.products,
    error: state.products.error
})

const mapDispatchToProps = {
    fetchProductsAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(ProductTable);
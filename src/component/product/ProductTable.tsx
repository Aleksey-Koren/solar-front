import {connect, ConnectedProps} from "react-redux";
import Navbar from "../navbar/Navbar";
import {fetchProducts} from "../../service/productService";
import {useEffect} from "react";
import {fetchProductsAction} from "./productActions";
import {IState} from "../../index";

const ProductTable: React.FC<Props> = (props) => {

    useEffect(() => {
        props.fetchProductsAction(fetchProducts, 0, 5);
    });

    return (<div>
            <Navbar/>
        {props.isPending === true ? <h1>Loading...</h1>: null}
        {props.products.length > 0 && !props.isPending && !props.error ? <p>{props.products.map((s: { toString: () => any; }) => s.toString())}</p> : null}
        {props.error ? <h1>Error</h1> : null}
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

import {AppState} from "../../../index";
import {findStationsTF} from "../../../redux/stations/stationActions";
import {connect, ConnectedProps} from "react-redux";
import React from "react";
import {Link, useParams} from "react-router-dom";
import {StationFormType} from "./StationFormsContainer";

const ProductsForm: React.FC<TProps> = (props) => {

    const {id} = useParams();

    return (
        <div>
            <h1 style={{color: 'white'}}>Products Form Id is {id}</h1>
        </div>
    )
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
    formType: ownProps.formType
})

const mapDispatchToProps = {

}

const connector = connect(mapStateToProps, mapDispatchToProps);
type TProps = ConnectedProps<typeof connector>;

export default connector(ProductsForm);

interface OwnProps {
    formType: StationFormType
}
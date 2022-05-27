import {AppState} from "../../../index";
import {findStationsTF} from "../../../redux/stations/stationActions";
import {connect, ConnectedProps} from "react-redux";
import React from "react";
import {Link, Outlet, useParams} from "react-router-dom";
import style from "./StationForm.module.css"
import StationForm from "./StationForm";
import ProductsForm from "./ProductsForm";

const StationFormContainer: React.FC<TProps> = (props) => {

    return (
        <div className={style.forms_container}>
            <StationForm formType={props.formType}/>
            <ProductsForm formType={props.formType}/>
        </div>
    )
}

const mapStateToProps = (state: AppState, ownProps: IOwnProps) => ({
    formType: ownProps.formType
})

const mapDispatchToProps = {

}

const connector = connect(mapStateToProps, mapDispatchToProps);
type TProps = ConnectedProps<typeof connector>;

export default connector(StationFormContainer);

interface IOwnProps {
    formType: StationFormType
}

export enum StationFormType {
    EDIT = 'EDIT',
    CREATE = 'CREATE'
}
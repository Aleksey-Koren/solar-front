import {AppState} from "../../../index";
import {findStationsTF} from "../../../redux/stations/stationActions";
import {connect, ConnectedProps} from "react-redux";
import React, {useEffect} from "react";
import {Link, Outlet, useParams} from "react-router-dom";
import style from "./StationForm.module.css"
import {StationFormType} from "./StationFormsContainer";

const StationForm: React.FC<TProps> = (props) => {

    const {id} = useParams();

    useEffect(() => {
        if(props.formType === StationFormType.EDIT) {

        }
    }, [])

    return (
        <div>
            <h1 style={{color: 'white'}}>Id is {id}</h1>
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

export default connector(StationForm);

interface OwnProps {
    formType: StationFormType
}
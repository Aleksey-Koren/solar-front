import style from './PlanetForm.module.css'
import React from "react";
import Navbar from "../../navbar/Navbar";
import {useLocation} from "react-router";
import {Planet} from "../../../model/planet/Planet";
import {Formik} from 'formik';
import PlanetFormContainer from "./form-container/PlanetFormContainer";
import {planetFormInitValues, planetValidationSchema} from "./formik-config/formikConfig";
import MoonsModal from "./moons-modal/MoonsModal";
import {hideErrorPopup, updatePlanet} from "../../../redux/planets/planetActions";
import {connect, ConnectedProps} from "react-redux";
import ErrorPopup from "../../error-popup/ErrorPopup";
import {AppState} from "../../../index";


const PlanetForm: React.FC<Props> = (props) => {
    const {state} = useLocation();
    let planet = state as Planet;

    return (
        <div className={style.container}>
            <Navbar/>
            <div className={style.form_container}>
                <Formik
                    initialValues={planetFormInitValues(planet)}
                    onSubmit={values => props.updatePlanet(values as Planet)}
                    validationSchema={planetValidationSchema}
                    validateOnChange
                    enableReinitialize
                >
                    {formik => <PlanetFormContainer planet={planet} formik={formik}/>}
                </Formik>
            </div>

            {planet ? <MoonsModal parentPlanet={planet}/> : ''}

            <ErrorPopup isError={props.isError} errorMessage={'Server error. Please, try again'}
                        handlePopupClose={props.hideErrorPopup} autoHideDuration={5000}/>
        </div>
    )
}

const mapStateToProps = (state: AppState) => ({
    isLoading: state.planets.isLoading,
    isError: state.planets.isError,
})


const mapDispatchToProps = {
    updatePlanet,
    hideErrorPopup
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(PlanetForm);
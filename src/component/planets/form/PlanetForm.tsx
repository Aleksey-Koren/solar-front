import style from './PlanetForm.module.css'
import React from "react";
import Navbar from "../../navbar/Navbar";
import {useLocation} from "react-router";
import {Planet} from "../../../model/planet/Planet";
import {Formik} from 'formik';
import PlanetFormContainer from "./form-container/PlanetFormContainer";
import {onPlanetFormSubmit, planetFormInitValues, planetValidationSchema} from "./formik-config/formikConfig";
import MoonsModal from "./moons-modal/MoonsModal";


function PlanetForm() {
    const {state} = useLocation();
    let planet = state as Planet;

    return (
        <div className={style.wrapper}>
            <Navbar/>
            <div className={style.form_container}>
                <Formik
                    initialValues={planetFormInitValues(planet)}
                    onSubmit={values => onPlanetFormSubmit(values as Planet)}
                    validationSchema={planetValidationSchema}
                    validateOnChange
                    enableReinitialize
                >
                    {formik => <PlanetFormContainer planet={planet} formik={formik}/>}
                </Formik>
            </div>
            {planet ? <MoonsModal parentPlanet={planet}/> : ''}
        </div>
    )
}

export default PlanetForm;
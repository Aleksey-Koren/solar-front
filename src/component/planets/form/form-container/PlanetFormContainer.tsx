import React, {useEffect, useState} from "react";
import style from '../PlanetForm.module.css'
import {Field} from "formik";
import {DropdownOption} from "../../../../model/planet/DropdownOption";
import {findAllPlanetsNamesForDropdown} from "../../../../service/planetService";
import {useNavigate} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import {PlanetFormContainerProps} from "../formik-config/formikConfig";
import {showMoonsModal} from "../../../../redux/planets/planetActions";
import {useAppDispatch} from "../../../../index";


function PlanetFormContainer(props: PlanetFormContainerProps) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [dropdownOptions, setDropdownOptions] = useState<DropdownOption[]>([]);

    useEffect(() => {
        findAllPlanetsNamesForDropdown().then(resp => setDropdownOptions(resp.data));
    }, [])
    return (
        <div className={style.planet_form}>
            <div className={style.planet_form__header}>
                <h1>{props.planet ? props.planet.title : 'Create planet'}</h1>
            </div>
            <div className={style.planet_form__body}>
                <table>
                    <tbody>
                    <tr>
                        <td className={style.planet_form__field_label}>Title</td>
                        <td>
                            <Tooltip title={props.formik.errors.title ? `${props.formik.errors.title}` : ''}
                                     open={!!props.formik.errors.title && !!props.formik.touched.title}
                                     placement={"top"} arrow>
                                <div>
                                    <Field name={"title"} type={"text"} className={style.planet_form__input_field}/>
                                </div>
                            </Tooltip>
                        </td>

                        <td className={style.planet_form__field_label}>Type</td>
                        <td>
                            <Tooltip title={props.formik.errors.type ? `${props.formik.errors.type}` : ''}
                                     open={!!props.formik.errors.type && !!props.formik.touched.type}
                                     placement={"top"} arrow>
                                <div>
                                    <Field component={"select"} name={"type"}
                                           className={style.planet_form__select_field}>
                                        <option value="" disabled hidden>Select Type</option>
                                        <option value={'star'}>Star</option>
                                        <option value={'planet'}>Planet</option>
                                        <option value={'moon'}>Moon</option>
                                    </Field>
                                </div>
                            </Tooltip>
                        </td>

                        <td className={style.planet_form__field_label}>Aldebo</td>
                        <td>
                            <Field className={style.planet_form__input_field} name={"aldebo"} type={"text"}/>
                        </td>

                        <td className={style.planet_form__field_label}>Aphelion</td>
                        <td>
                            <Field className={style.planet_form__input_field} name={"aphelion"} type={"text"}/>
                        </td>
                    </tr>
                    <tr>
                        <td className={style.planet_form__field_label}>Angle</td>
                        <td>
                            <Tooltip title={props.formik.errors.angle ? `${props.formik.errors.angle}` : ''}
                                     open={!!props.formik.errors.angle && !!props.formik.touched.angle}
                                     placement={"top"} arrow>
                                <div>
                                    <Field name={"angle"} type={"number"} className={style.planet_form__input_field}/>
                                </div>
                            </Tooltip>
                        </td>

                        <td className={style.planet_form__field_label}>Axial Tilt</td>
                        <td>
                            <Field className={style.planet_form__input_field} name={"axialTilt"} type={"text"}/>
                        </td>

                        <td className={style.planet_form__field_label}>Eccentricity</td>
                        <td>
                            <Field className={style.planet_form__input_field} name={"eccentricity"} type={"text"}/>
                        </td>

                        <td className={style.planet_form__field_label}>Escape Velocity</td>
                        <td>
                            <Field className={style.planet_form__input_field} name={"escapeVelocity"} type={"text"}/>
                        </td>
                    </tr>
                    <tr>
                        <td className={style.planet_form__field_label}>Inclination</td>
                        <td>
                            <Field className={style.planet_form__input_field} name={"inclination"} type={"text"}/>
                        </td>

                        <td className={style.planet_form__field_label}>Mass</td>
                        <td>
                            <Field className={style.planet_form__input_field} name={"mass"} type={"text"}/>
                        </td>

                        <td className={style.planet_form__field_label}>Mean Anomaly</td>
                        <td>
                            <Field className={style.planet_form__input_field} name={"meanAnomaly"} type={"text"}/>
                        </td>

                        <td className={style.planet_form__field_label}>Mean Orbit Radius</td>
                        <td>
                            <Field className={style.planet_form__input_field} name={"meanOrbitRadius"} type={"text"}/>
                        </td>
                    </tr>
                    <tr>
                        <td className={style.planet_form__field_label}>Mean Radius</td>
                        <td>
                            <Field className={style.planet_form__input_field} name={"meanRadius"} type={"text"}/>
                        </td>

                        <td className={style.planet_form__field_label}>Orbital Period (days)</td>
                        <td>
                            <Tooltip
                                title={props.formik.errors.orbitalPeriod ? `${props.formik.errors.orbitalPeriod}` : ''}
                                open={!!props.formik.errors.orbitalPeriod && !!props.formik.touched.orbitalPeriod}
                                placement={"top"} arrow>
                                <div>
                                    <Field name={"orbitalPeriod"} type={"number"}
                                           className={style.planet_form__input_field}/>
                                </div>
                            </Tooltip>
                        </td>

                        <td className={style.planet_form__field_label}>Perihelion</td>
                        <td>
                            <Field className={style.planet_form__input_field} name={"perihelion"} type={"text"}/>
                        </td>

                        <td className={style.planet_form__field_label}>Sidereal Rotation Period</td>
                        <td>
                            <Field className={style.planet_form__input_field} name={"siderealRotationPeriod"}
                                   type={"text"}/>
                        </td>
                    </tr>
                    <tr>
                        <td className={style.planet_form__field_label}>Surface Gravity</td>
                        <td>
                            <Field className={style.planet_form__input_field} name={"surfaceGravity"} type={"text"}/>
                        </td>

                        <td className={style.planet_form__field_label}>Surface Pressure</td>
                        <td>
                            <Field className={style.planet_form__input_field} name={"surfacePressure"} type={"text"}/>
                        </td>

                        <td className={style.planet_form__field_label}>Volume</td>
                        <td>
                            <Field className={style.planet_form__input_field} name={"volume"} type={"text"}/>
                        </td>

                        <td className={style.planet_form__field_label}>Parent</td>
                        <td>
                            <Tooltip title={props.formik.errors.parent ? `${props.formik.errors.parent}` : ''}
                                     open={!!props.formik.errors.parent && !!props.formik.touched.parent}
                                     placement={"top"} arrow>
                                <div>
                                    <Field component={"select"} name={"parent"}
                                           className={style.planet_form__select_field}>
                                        <option defaultValue={''}>No parent</option>
                                        {dropdownOptions.map((type, index) => <option key={index}
                                                                                      value={type?.value}>{type.label}</option>)}
                                    </Field>
                                </div>
                            </Tooltip>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className={style.planet_form__footer}>
                <button className={style.planet_form__button} onClick={() => navigate('/planets')}>Back</button>
                <button className={style.planet_form__button} onClick={() => props.formik.handleSubmit()}
                        type={"submit"}>Save
                </button>
                {props.planet &&
                    <button className={style.planet_form__button}
                            onClick={() => dispatch(showMoonsModal())}>Moons</button>}
            </div>
        </div>
    );
}

export default PlanetFormContainer;
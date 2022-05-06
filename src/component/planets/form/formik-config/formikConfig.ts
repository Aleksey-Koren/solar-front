import * as yup from "yup";
import {Planet} from "../../../../model/planet/Planet";
import {FormikProps} from "formik";

export const planetValidationSchema = yup.object().shape({
    title: yup.string().required('Title cannot be empty'),
    angle: yup.number().typeError('Angle should be a number').required('Angle cannot be empty').min(-6.18).max(6.18),
    type: yup.string().required('Select type').nullable(),
    orbitalPeriod: yup.number().typeError('Orbital period should be a number').when("type", (type: string) => {
        if (type !== 'star') {
            return yup.string().required('Orbital period cannot be empty')
        }
    }),
    parent: yup.string().nullable().when("type", (type: string) => {
        if (type !== 'star') {
            return yup.string().required('Select parent')
        }
    })
})

export const planetFormInitValues = (planet: Planet) => ({
    id: planet?.id ? planet.id : '',
    x: planet?.x ? planet.x : '',
    y: planet?.y ? planet.y : '',
    population: planet?.population ? planet.population : '',
    title: planet?.title ? planet.title : '',
    type: planet?.type ? planet.type : '',
    aldebo: planet?.aldebo ? planet.aldebo : '',
    aphelion: planet?.aphelion ? planet.aphelion : '',
    angle: planet?.angle ? planet.angle : '',
    axialTilt: planet?.axialTilt ? planet.axialTilt : '',
    eccentricity: planet?.eccentricity ? planet.eccentricity : '',
    escapeVelocity: planet?.escapeVelocity ? planet.escapeVelocity : '',
    inclination: planet?.inclination ? planet.inclination : '',
    mass: planet?.mass ? planet.mass : '',
    meanAnomaly: planet?.meanAnomaly ? planet.meanAnomaly : '',
    meanOrbitRadius: planet?.meanOrbitRadius ? planet.meanOrbitRadius : '',
    meanRadius: planet?.meanRadius ? planet.meanRadius : '',
    orbitalPeriod: planet?.orbitalPeriod ? planet.orbitalPeriod : '',
    perihelion: planet?.perihelion ? planet.perihelion : '',
    siderealRotationPeriod: planet?.siderealRotationPeriod ? planet.siderealRotationPeriod : '',
    surfaceGravity: planet?.surfaceGravity ? planet.surfaceGravity : '',
    surfacePressure: planet?.surfacePressure ? planet.surfacePressure : '',
    volume: planet?.volume ? planet.volume : '',
    parent: planet?.parent ? planet.parent : ''
})

export interface PlanetFormContainerProps {
    planet?: Planet,
    formik: FormikProps<any>
}
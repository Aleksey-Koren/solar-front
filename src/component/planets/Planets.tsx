import style from './Planets.module.css'
import {CircularProgress, Stack, Table, TableContainer} from "@mui/material";
import Navbar from "../navbar/Navbar";
import React, {useEffect} from "react";
import {connect, ConnectedProps} from 'react-redux';
import {IState} from "../../index";
import {findPlanetsAndStars, hideErrorPopup} from '../../redux/planets/planetActions';
import PlanetsTableHeader from "./table/PlanetsTableHeader";
import PlanetsTableBody from "./table/PlanetsTableBody";
import PlanetsTableFooter from "./table/PlanetsTableFooter";
import {Link, useNavigate} from "react-router-dom";
import ErrorPopup from "../error-popup/ErrorPopup";

const Planets: React.FC<Props> = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        props.findPlanetsAndStars(0, 10)
    }, [props.findPlanetsAndStars])

    return (
        <>
            <Navbar/>
            <h1 className={style.planets_title}>Planet list</h1>
            {props.isLoading
                ? <Stack alignItems="center">
                    <CircularProgress/>
                </Stack>
                : <TableContainer classes={{root: style.MuiTableContainer_root}}>
                    <Table>
                        <PlanetsTableHeader/>
                        <PlanetsTableBody/>
                        <PlanetsTableFooter/>
                    </Table>
                </TableContainer>
            }
            <Link to={'/planet-form'} className={style.create_link}>+</Link>

            <ErrorPopup isError={props.isError} errorMessage={'Server error. Please, refresh page'}
                        handlePopupClose={props.hideErrorPopup} autoHideDuration={5000}/>
        </>
    );
}

const mapStateToProps = (state: IState) => ({
    isLoading: state.planets.isLoading,
    isError: state.planets.isError,
})

const mapDispatchToProps = {
    findPlanetsAndStars,
    hideErrorPopup
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(Planets);
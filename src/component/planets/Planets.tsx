import './Planets.css'
import {CircularProgress, Table, TableContainer} from "@mui/material";
import Navbar from "../navbar/Navbar";
import React, {useEffect} from "react";
import {connect, ConnectedProps} from 'react-redux';
import {IState} from "../../index";
import {findPlanetsAndStars} from '../../redux/planets/planetActions';
import PlanetsTableHeader from "./table/PlanetsTableHeader";
import PlanetsTableBody from "./table/PlanetsTableBody";
import PlanetsTableFooter from "./table/PlanetsTableFooter";

const Planets: React.FC<Props> = (props) => {
    useEffect(() => {
        props.findPlanetsAndStars(0, 10)
    }, [props.findPlanetsAndStars])


    return (
        <>
            <Navbar/>
            <h1 className={"planets_title"}>PLANETS</h1>
            {props.isLoading
                ? <CircularProgress />
                : <TableContainer>
                    <Table>
                        <PlanetsTableHeader/>
                        <PlanetsTableBody/>
                        <PlanetsTableFooter/>
                    </Table>
                </TableContainer>
            }
        </>
    );
}

const mapStateToProps = (state: IState) => ({
    isLoading: state.planets.isLoading,
    isError: state.planets.isError,
})

const mapDispatchToProps = {
    findPlanetsAndStars
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(Planets);
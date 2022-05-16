import planetsStyle from './Planets.module.css'
import globalStyle from '../global-styles/GlobalStyles.module.css'
import {IconButton, Table, TableContainer} from "@mui/material";
import Navbar from "../navbar/Navbar";
import React, {useEffect} from "react";
import {connect, ConnectedProps} from 'react-redux';
import {findPlanetsAndStars, hideErrorPopup} from '../../redux/planets/planetActions';
import PlanetsTableHeader from "./table/PlanetsTableHeader";
import PlanetsTableBody from "./table/PlanetsTableBody";
import PlanetsTableFooter from "./table/PlanetsTableFooter";
import {useNavigate} from "react-router-dom";
import ErrorPopup from "../error-popup/ErrorPopup";
import {AppState} from "../../index";
import LoadProgress from "../circular-progress/LoadProgress";
import AddIcon from "@mui/icons-material/Add";

const Planets: React.FC<Props> = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        props.findPlanetsAndStars(0, 10)
    }, [props.findPlanetsAndStars])


    return (
        <div className={globalStyle.wrapper}>
            <Navbar/>

            <h1 className={globalStyle.page_title}>Planet list</h1>

            {props.isLoading
                ? <LoadProgress/>
                : <div>
                    <TableContainer classes={{root: planetsStyle.MuiTableContainer_root}}>
                        <Table>
                            <PlanetsTableHeader/>
                            <PlanetsTableBody/>
                            <PlanetsTableFooter/>
                        </Table>
                    </TableContainer>
                </div>
            }

            <IconButton onClick={() => navigate('/planet-form')}>
                <AddIcon className={globalStyle.add_icon} fontSize={"large"}/>
            </IconButton>

            <ErrorPopup isError={props.isError} errorMessage={'Server error. Please, refresh page'}
                        handlePopupClose={props.hideErrorPopup} autoHideDuration={5000}/>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
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
import style from './MoonsModal.module.css';
import Dialog from "@mui/material/Dialog/Dialog";
import AppBar from "@mui/material/AppBar/AppBar";
import {IconButton, Table, TableContainer, Toolbar, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, {useEffect} from "react";
import PlanetsTableHeader from "../../table/PlanetsTableHeader";
import PlanetsTableBody from "../../table/PlanetsTableBody";
import PlanetsTableFooter from "../../table/PlanetsTableFooter";
import {findMoons, hideErrorPopup, hideMoonsModal} from "../../../../redux/planets/planetActions";
import {connect, ConnectedProps} from "react-redux";
import {Planet} from "../../../../model/planet/Planet";
import {AppState} from "../../../../index";

const MoonsModal: React.FC<Props> = (props) => {
    useEffect(() => {
        props.findMoons(0, 10, props.parentPlanet.id)
    }, [props.parentPlanet])

    return (
        <Dialog fullWidth={true} maxWidth="xl" open={props.isModalOpen}>
            <AppBar classes={{root: style.app_bar}}>
                <Toolbar>
                    <IconButton onClick={() => props.hideMoonsModal()}>
                        <CloseIcon fontSize={'large'} classes={{root: style.close_icon}}/>
                    </IconButton>
                    <Typography variant="h4" component="div" flex={1} mx={3} align={"center"}>Moons</Typography>
                </Toolbar>
            </AppBar>

            {props.planets.length > 0
                ? (
                    <TableContainer classes={{root: style.table_container}}>
                        <Table>
                            <PlanetsTableHeader/>
                            <PlanetsTableBody/>
                            <PlanetsTableFooter parentPlanet={props.parentPlanet}/>
                        </Table>
                    </TableContainer>
                ) : (
                    <div className={style.without_moons_box}>
                        <h1>Planet without moons</h1>
                    </div>
                )
            }
        </Dialog>
    );
}

const mapStateToProps = (state: AppState, ownProps: { parentPlanet: Planet }) => ({
    isLoading: state.planets.isLoading,
    isError: state.planets.isError,
    parentPlanet: ownProps.parentPlanet,
    isModalOpen: state.planets.isMoonsModalOpen,
    planets: state.planets.planets
})

const mapDispatchToProps = {
    findMoons,
    hideMoonsModal,
    hideErrorPopup
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(MoonsModal);
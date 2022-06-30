import React from "react";
import {AppState} from "../../../index";
import {findMoons, findPlanetsAndStars} from "../../../redux/planets/planetActions";
import {connect, ConnectedProps} from "react-redux";
import {TableFooter, TablePagination, TableRow} from "@mui/material";
import globalTableStyles from '../../global-styles/MUITable.module.css'
import {Planet} from "../../../model/planet/Planet";

const PlanetsTableFooter: React.FC<Props> = (props) => {
    const onPageChange = (e: React.ChangeEvent<any>, page: number) => props.parentPlanet
        ? props.findMoons(page, props.planetsOnPage, props.parentPlanet.id)
        : props.findPlanetsAndStars(page, props.planetsOnPage);

    const onRowsPerPageChange = (event: React.ChangeEvent<any>) => props.parentPlanet
        ? props.findMoons(0, Number(event.target.value), props.parentPlanet.id)
        : props.findPlanetsAndStars(0, Number(event.target.value));

    return (
        <TableFooter>
            <TableRow>
                <TablePagination classes={{
                    root: globalTableStyles.MuiTablePagination_root,
                    spacer: globalTableStyles.MuiTablePagination_spacer,
                    toolbar: globalTableStyles.MuiTablePagination_toolbar
                }}
                                 colSpan={5} count={props.totalPlanetsAmount} rowsPerPage={props.planetsOnPage}
                                 page={props.currentPage} rowsPerPageOptions={[5, 10, 25]}
                                 onPageChange={onPageChange} onRowsPerPageChange={onRowsPerPageChange}
                                 labelRowsPerPage={<span>Planets on page:</span>}
                                 labelDisplayedRows={({page}) => `Page: ${page + 1}/${props.totalPagesAmount}`}
                                 showFirstButton={true} showLastButton={true}
                />
            </TableRow>
        </TableFooter>
    )
}

const mapStateToProps = (state: AppState, ownProps?: { parentPlanet?: Planet }) => ({
    currentPage: state.planets.currentPage,
    totalPlanetsAmount: state.planets.totalPlanetsAmount,
    planetsOnPage: state.planets.planetsOnPage,
    parentPlanet: ownProps.parentPlanet,
    totalPagesAmount: state.planets.totalPagesAmount
})

const mapDispatchToProps = {
    findPlanetsAndStars,
    findMoons
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(PlanetsTableFooter);
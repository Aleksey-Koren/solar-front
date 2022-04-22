import React from "react";
import {IState} from "../../../index";
import {findPlanetsAndStars} from "../../../redux/planets/planetActions";
import {connect, ConnectedProps} from "react-redux";
import {TableCell, TableFooter, TablePagination, TableRow} from "@mui/material";
import '../Planets.css'

const PlanetsTableFooter: React.FC<Props> = (props) => {

    const onPageChange = (e: React.ChangeEvent<any>, page: number) => props.findPlanetsAndStars(page, props.planetsOnPage);
    const onRowsPerPageChange = (event: React.ChangeEvent<any>) => props.findPlanetsAndStars(0, Number(event.target.value));

    return (
        <TableFooter>
            <TableRow>
                <TableCell align="center">
                    <button className={"create_button"}>Create planet</button>
                </TableCell>
                <TableCell colSpan={5}>
                    <TablePagination colSpan={5} count={props.totalPlanetsAmount} rowsPerPage={props.planetsOnPage}
                                     page={props.currentPage} onPageChange={onPageChange}
                                     onRowsPerPageChange={onRowsPerPageChange} rowsPerPageOptions={[5, 10, 25]}
                                     labelRowsPerPage={<span>Planets on page:</span>}
                                     labelDisplayedRows={({page}) => `Page: ${page + 1}`}
                                     showFirstButton={true}
                                     showLastButton={true}
                    />
                </TableCell>
            </TableRow>
        </TableFooter>
    )
}

const mapStateToProps = (state: IState) => ({
    currentPage: state.planets.currentPage,
    totalPlanetsAmount: state.planets.totalPlanetsAmount,
    planetsOnPage: state.planets.planetsOnPage
})

const mapDispatchToProps = {
    findPlanetsAndStars
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(PlanetsTableFooter);
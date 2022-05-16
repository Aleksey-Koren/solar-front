import {AppState} from "../../../index";
import {connect, ConnectedProps} from "react-redux";
import React from "react";
import {TableFooter, TablePagination, TableRow} from "@mui/material";
import globalStyles from "../../global-styles/MUITable.module.css";
import {findStationsActionCreator} from "../../../redux/stations/stationActions";

const StationsTableFooter: React.FC<TProps> = (props) => {

    const onRowsPerPageChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        let numberOfStations;
        if(Number(event.target.value) === -1) {
            numberOfStations = props.totalStations;
        } else {
            numberOfStations = Number(event.target.value);
        }
        props.findStationsActionCreator(0, numberOfStations);
    }

    const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        props.findStationsActionCreator(page, props.stationsPerPage);
    }

    return (
            <TableFooter>
                <TableRow>
                    <TablePagination className={globalStyles.tableCell_body} classes={{
                        root: globalStyles.tablePagination_root,
                        spacer: globalStyles.spacer,
                        selectIcon: globalStyles.actions
                    }}
                                     colSpan={7}
                                     count={props.totalStations}
                                     onPageChange={onPageChange}
                                     page={props.currentPage}
                                     rowsPerPage={props.stationsPerPage}
                                     onRowsPerPageChange={onRowsPerPageChange}
                                     rowsPerPageOptions={[3, 5, 10, {value: -1, label: 'Show All'}]}
                                     labelRowsPerPage={<span>Stations per page:</span>}
                                     showFirstButton={true}
                                     showLastButton={true}
                    />
                </TableRow>
            </TableFooter>
    )
}



const mapStateToProps = (state: AppState) => ({
    totalStations: state.stations.totalItems,
    currentPage: state.stations.currentPage,
    stationsPerPage: state.stations.itemsPerPage
});

const mapDispatchToProps = {
    findStationsActionCreator
}

type TProps = ConnectedProps<typeof connector>;

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(StationsTableFooter);
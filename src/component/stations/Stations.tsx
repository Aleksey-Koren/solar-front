import {AppState} from "../../index";
import React from "react";
import Navbar from "../navbar/Navbar";
import styles from './station.module.css';
import {connect, ConnectedProps} from "react-redux";
import StationsTable from "./table/StationsTable";

const Stations: React.FC<Props> = (props) => {
    return (
        <div className={styles.page_container}>
            <Navbar/>
            <h1>Stations</h1>
            <div className={styles.primary_content_container}>
                <StationsTable/>
            </div>
        </div>

    );
}

const mapStateToProps = (state: AppState) => ({

})

const mapDispatchToProps = {

}

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

export default connector(Stations);
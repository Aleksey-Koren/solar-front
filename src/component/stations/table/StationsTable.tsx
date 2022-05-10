import React from "react";
import {AppState} from "../../../index";
import {connect, ConnectedProps} from "react-redux";

const StationsTable: React.FC<any> = (props) => {



    return (
        <div>

        </div>
    )
}

const mapStateToProps = (state: AppState) => ({

})

const mapDispatchToProps = {

}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(StationsTable);

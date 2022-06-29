import globalStyle from '../global-styles/GlobalStyles.module.css'
import Navbar from "../navbar/Navbar";
import React from "react";
import {connect, ConnectedProps} from "react-redux";
import {AppState} from "../../index";
import {fetchInventoryTypes, setIsInventoryTypeEditFormOpen} from "../../redux/inventory-type/inventoryTypesActions";
import LoadProgress from "../circular-progress/LoadProgress";
import {IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ErrorPopup from "../error-popup/ErrorPopup";
import InventoryTypesTable from "./table/InventoryTypesTable";
import InventoryTypesFormModal from "./modal/InventoryTypesFormModal";


const InventoryTypes: React.FC<Props> = (props) => {

    return (
        <div className={globalStyle.wrapper}>
            <Navbar/>
            <h1 className={globalStyle.page_title}>
                Inventory Types
            </h1>

            {props.isLoading
                ? <LoadProgress/>
                : <div>

                    <InventoryTypesTable/>

                    <InventoryTypesFormModal/>

                    <IconButton onClick={() => props.setIsInventoryTypeEditFormOpen(true)}>
                        <AddIcon className={globalStyle.add_icon} fontSize={"large"}/>
                    </IconButton>
                </div>
            }

            <ErrorPopup isError={props.isError} errorMessage={"Server error. Please, try again / refresh page"}
                        isShowReloadButton={true}/>
        </div>
    );
}

const mapStateToProps = (state: AppState) => ({
    isLoading: state.inventoryTypes.isLoading,
    isError: state.inventoryTypes.isError,
})

const mapDispatchToProps = {
    fetchInventoryTypes,
    setIsInventoryTypeEditFormOpen
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>

export default connector(InventoryTypes);
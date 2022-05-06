import Navbar from "../navbar/Navbar";
import {IconButton} from "@mui/material";
import React, {useEffect, useState} from "react";
import {AppState} from "../../index";
import {connect, ConnectedProps} from "react-redux";
import {
    deleteSelectedPermissions,
    findAllPermissions,
    setOpenPermissionFormModal
} from "../../redux/permissions/permissionsActions";
import style from './Permissions.module.css'
import PermissionsFormModal from "./modal/PermissionsFormModal";
import ErrorPopup from "../error-popup/ErrorPopup";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import LoadProgress from "../circular-progress/LoadProgress";
import PermissionsTable from "./table/PermissionsTable";

const Permissions: React.FC<Props> = (props) => {

    const [selectedPermissionsIds, setSelectedPermissionsIds] = useState<number[]>([]);

    useEffect(() => {
        props.findAllPermissions();
    }, [props.findAllPermissions])

    return (
        <div className={style.container}>
            <Navbar/>
            <h1 className={style.permissions_title}>
                Permissions list
            </h1>

            {props.isLoading
                ? <LoadProgress/>
                : <div>

                    <PermissionsTable selectedPermissionsIds={selectedPermissionsIds}
                                      setSelectedPermissionsIds={setSelectedPermissionsIds}
                    />

                    {selectedPermissionsIds.length > 0 &&
                        <IconButton onClick={() => props.deleteSelectedPermissions(selectedPermissionsIds)}>
                            <DeleteIcon className={style.delete_icon} fontSize={"large"}/>
                        </IconButton>
                    }

                    <IconButton onClick={() => props.setOpenPermissionFormModal(true)}>
                        <AddIcon className={style.add_icon} fontSize={"large"}/>
                    </IconButton>

                    <PermissionsFormModal/>
                </div>
            }

            <ErrorPopup isError={props.isError} errorMessage={'Server error. Please, refresh page'}/>
        </div>
    )
}

const mapStateToProps = (state: AppState) => ({
    permissions: state.permissions.permissions,
    isError: state.permissions.isError,
    isLoading: state.permissions.isLoading
})

const mapDispatchToProps = {
    findAllPermissions,
    setOpenPermissionFormModal,
    deleteSelectedPermissions
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(Permissions);
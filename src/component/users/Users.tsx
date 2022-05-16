import React, {useEffect} from "react";
import {AppState} from "../../index";
import {connect, ConnectedProps} from "react-redux";
import {findUsers} from "../../redux/users/usersActions";
import globalStyle from '../global-styles/GlobalStyles.module.css'
import Navbar from "../navbar/Navbar";
import LoadProgress from "../circular-progress/LoadProgress";
import ErrorPopup from "../error-popup/ErrorPopup";
import UsersTable from "./table/UsersTable";
import UserFormModal from "./modal/UserFormModal";

const Users: React.FC<Props> = (props) => {

    useEffect(() => {
        props.findUsers(0, 10);
    }, [props.findUsers])


    return (
        <div className={globalStyle.wrapper}>
            <Navbar/>
            <h1 className={globalStyle.page_title}>Users list</h1>

            {props.isLoading
                ? <LoadProgress/>
                : <div>
                    <UsersTable/>
                    <UserFormModal/>
                </div>
            }

            <ErrorPopup isError={props.isError} errorMessage={'Server error. Try again / refresh page.'}
                        isShowReloadButton={true}/>
        </div>
    )
}

const mapStateToProps = (state: AppState) => ({
    users: state.users.users,
    isError: state.users.isError,
    isLoading: state.users.isLoading,
})

const mapDispatchToProps = {
    findUsers
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

export default connector(Users);
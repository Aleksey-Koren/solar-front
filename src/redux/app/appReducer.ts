import {CLOSE_CONFIRM_MODAL, OPEN_CONFIRM_MODAL, TAppAction, TAppState} from "./appTypes";

const initState: TAppState = {
    isConfirmModalOpen: false,
    confirmModalProps: null
}

export function appReducer(state: TAppState = initState, action: TAppAction) {

    switch (action.type) {

        case OPEN_CONFIRM_MODAL:
            return {isConfirmModalOpen: true, confirmModalProps: action.payload};

        case CLOSE_CONFIRM_MODAL:
            return {isConfirmModalOpen: false, confirmModalProps: null};

        default:
            return state;
    }
}
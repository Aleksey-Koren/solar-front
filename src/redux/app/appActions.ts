import {CLOSE_CONFIRM_MODAL, IConfirmModalProps, OPEN_CONFIRM_MODAL} from "./appTypes";
import {IPlainDataAction} from "../redux-types";

export function openConfirmModal(onConfirmModalAccept: any, confirmMessage: string): IPlainDataAction<IConfirmModalProps> {
    return {
        type: OPEN_CONFIRM_MODAL,
        payload: {onConfirmModalAccept, confirmMessage}
    }
}

export function closeConfirmModal(): IPlainDataAction<void> {
    return {
        type: CLOSE_CONFIRM_MODAL,
        payload: null
    }
}
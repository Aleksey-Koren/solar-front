import {IPlainDataAction} from "../redux-types";

export interface IConfirmModalProps {
    onConfirmModalAccept: any;
    confirmMessage: string;
}

interface IAppState {
    isConfirmModalOpen: boolean;
    confirmModalProps: IConfirmModalProps;
}

export type TAppState = IAppState;

export type TAppAction = IPlainDataAction<IConfirmModalProps>

export const OPEN_CONFIRM_MODAL = 'OPEN_CONFIRM_MODAL';
export const CLOSE_CONFIRM_MODAL = 'CLOSE_CONFIRM_MODAL';

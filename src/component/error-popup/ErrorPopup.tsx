import {Alert, Snackbar} from "@mui/material";

interface ErrorPopupProps {
    isError: boolean;
    errorMessage: string;
    handlePopupClose: () => void;
}


function ErrorPopup(props: ErrorPopupProps) {

    return (
        <Snackbar open={props.isError} anchorOrigin={{vertical: 'bottom', horizontal: "right"}} autoHideDuration={5000} onClose={() => props.handlePopupClose()}>
            <Alert severity="error" sx={{width: '100%'}}>
                <strong>{props.errorMessage}</strong>
            </Alert>
        </Snackbar>
    );
}

export default ErrorPopup;
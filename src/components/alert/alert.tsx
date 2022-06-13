import { DialogContentText, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import AlertContext from '../../contexts/alert';
import { useContext } from "react";

const Alert: React.FC = () => {
    const {open, title, content, buttons, handleClose} = useContext(AlertContext);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {
                    buttons.map(button => {
                        return button;
                    })
                }
            </DialogActions>
        </Dialog>
    );
}

export default Alert;
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import SnackBarContext from "../../contexts/snackbar";
import { useContext } from "react";

const SnackBar = () => {
  const { open, body, type, handleClose: handleCloseSnack } = useContext(SnackBarContext);

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    handleCloseSnack();
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      {
        type !== "" && type == "error" ? (
          (<MuiAlert
            elevation={6}
            variant="filled"
            severity="error"
            sx={{ width: "100%" }}
          >
            {body}
          </MuiAlert>)
        ) : (<MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          sx={{ width: "100%" }}
        >
          {body}
        </MuiAlert>) 
      }
    </Snackbar>
  );
};

export default SnackBar;
import {
  Box,
  Button,
  Card,
  Divider,
  Skeleton,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import AlertContext from "../../contexts/alert";
import ModalContext from "../../contexts/modal";
import { LocationOn } from "@mui/icons-material";
import { IPatientDisplay } from "../../data/interfaces/IPatientDisplay.interface";
import { grey } from "@mui/material/colors";
import EventIcon from "@mui/icons-material/Event";
import SnackBar from "../snackbar/snackbar";

const PatientDataDisplay: React.FC<IPatientDisplay> = ({
  patient,
  disabled,
  deleteButton,
  editButton,
}) => {
  const { handleOpen } = useContext(ModalContext);
  const { handleOpenAlert, handleClose, handleDelete } =
    useContext(AlertContext);
  const buttons = (id: string) => [
    <Button key={0} onClick={() => handleClose()}>
      Cancel
    </Button>,
    <Button
      key={1}
      color="error"
      onClick={() => {
        handleDelete(id);
        setTransition(false);
      }}
    >
      Delete
    </Button>,
  ];
  const [transition, setTransition] = useState(true);

  return (
    <>
      <SnackBar />
      <Slide
        timeout={500}
        appear={false}
        direction="left"
        in={transition}
        unmountOnExit
      >
        <Card className={patient ? "" : "loading-patient-card"} sx={{ my: 3 }}>
          <Box sx={{ p: 2, display: "flex" }}>
            <Stack className="w-100" spacing={0.5}>
              <Box>
                <Typography
                  sx={{ display: "flex", alignItems: "center" }}
                  fontWeight={500}
                  fontSize={20}
                >
                  {patient?.name ? (
                    patient.name
                  ) : (
                    <Skeleton width={90} animation="wave" />
                  )}
                  <Button
                    disabled={disabled}
                    onClick={() =>
                      handleOpen("Update Patient", {
                        id: patient?.id,
                        name: patient?.name as string,
                        email: patient?.email as string,
                        value: patient?.birth as string,
                        city: patient?.address.city as string,
                        state: patient?.address.state as string,
                        zip: patient?.address.zip as string,
                        address: patient?.address.info as string,
                      })
                    }
                    size="small"
                    sx={{
                      p: 0,
                      ml: 1,
                      maxWidth: 28,
                      maxHeight: 28,
                      minWidth: 28,
                      minHeight: 28,
                    }}
                    variant="text"
                    color="primary"
                  >
                    {editButton ? (
                      editButton
                    ) : (
                      <Skeleton
                        variant="rectangular"
                        width={20}
                        height={20}
                        animation="wave"
                      />
                    )}
                  </Button>
                </Typography>
                <Typography variant="body1">
                  {patient?.email ? (
                    patient.email
                  ) : (
                    <Skeleton width={180} animation="wave" />
                  )}
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  <EventIcon sx={{ color: grey[600], mr: 1 }} />
                  {patient?.birth ? (
                    patient.birth
                  ) : (
                    <Skeleton width={80} animation="wave" />
                  )}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" color="text.secondary">
                  <LocationOn sx={{ color: grey[600], mr: 1 }} />{" "}
                  {patient?.address ? (
                    `${patient.address.info}, ${patient.address.zip},
                    ${patient.address.city}, ${patient.address.state}`
                  ) : (
                    <Skeleton width={190} animation="wave" />
                  )}
                </Typography>
                <Button
                  disabled={disabled}
                  onClick={() =>
                    handleOpenAlert(
                      "Warning",
                      `Are you shure you want to delete the patient ${patient?.name}?`,
                      buttons(patient?.id as string)
                    )
                  }
                  sx={{ p: 0 }}
                >
                  {deleteButton ? (
                    deleteButton
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      width={60}
                      height={20}
                      animation="wave"
                    />
                  )}
                </Button>
              </Box>
            </Stack>
          </Box>
        </Card>
      </Slide>
    </>
  );
};

export default PatientDataDisplay;

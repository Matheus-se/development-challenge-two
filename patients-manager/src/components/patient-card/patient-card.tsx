import {
  Box,
  Button,
  Card,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Edit, LocationOn } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { grey } from "@mui/material/colors";
import EventIcon from "@mui/icons-material/Event";
import { Patient } from "../../data/models/Patient.model";
import { LoadingContainer } from "../../styles/components/patientCard/style";
import RefreshIcon from "@mui/icons-material/Refresh";
import PatientsContext from "../../contexts/patients";
import { useContext } from "react";
import PatientDataDisplay from "../petient-data-display/patient-data-display";

const PatientCard: React.FC = () => {
  const { patients, loading, lastId, loadPatients } =
    useContext(PatientsContext);

  return (
    <>
      {patients?.map((patient, i) => {
        patient = new Patient(
          patient.birth,
          patient.name,
          patient.email,
          patient.address,
          patient.id,
          patient.createdAt
        );

        return (
          <PatientDataDisplay
            deleteButton={<DeleteIcon color="error"></DeleteIcon>}
            editButton={<Edit color="primary" sx={{ fontSize: 16 }} />}
            disabled={false}
            patient={patient}
            key={i}
          />
        );
      })}
      <LoadingContainer>
        {loading ? (
          [0, 1, 2, 3, 4].map((el) => {
            return <PatientDataDisplay key={el} disabled={true} />;
          })
        ) : lastId !== undefined ? (
          <Button
            onClick={() => loadPatients()}
            startIcon={<RefreshIcon />}
            sx={{ py: 1, px: 4, borderRadius: 100 }}
            variant="contained"
          >
            Load more
          </Button>
        ) : null}
      </LoadingContainer>
    </>
  );
};

export default PatientCard;

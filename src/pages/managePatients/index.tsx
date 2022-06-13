import { Button, Fab, useTheme } from "@mui/material";
import Jumbotron from "../../components/jumbotron/jumbotron";
import JumbotronSnack from "../../components/jumbotron-snack/jumbotron-snack";
import {
  BodyContainer,
  JumbotronWrapper,
} from "../../styles/pages/managePatients/style";
import Wave from "../../components/wave/wave";
import { Container } from "@mui/system";
import SearchInput from "../../components/search-input/search-input";
import PatientCard from "../../components/patient-card/patient-card";
import { items } from "../../data/consts/managePatients";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useContext, useEffect, useRef, useState } from "react";
import PatientInfoDialog from "../../components/patient-info-dialog/patient-info-dialog";
import Alert from "../../components/alert/alert";
import { Fade } from "@mui/material";
import ModalContext from "../../contexts/modal";
import UserPoolContext from "../../contexts/userPool";
import NotLoggedInBody from "../../components/not-logged-in-body/not-logged-in-body";

const ManagePatients: React.FC = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const { handleOpen } = useContext(ModalContext);
  const { isLoggedIn } = useContext(UserPoolContext);

  function goToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const toggleVisible = () => {
    const scrolled = document?.documentElement?.scrollTop || 0;
    if (scrolled > 200) {
      setVisible(() => true);
    } else if (scrolled <= 200) {
      setVisible(() => false);
    }
  };

  useEffect(() => {
    // loadPatients();
    window.addEventListener("scroll", toggleVisible);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PatientInfoDialog />
      <Alert></Alert>
      <JumbotronWrapper>
        <Jumbotron theme={theme} />
        <JumbotronSnack theme={theme} items={items} />
        <Wave className="wave" theme={theme}></Wave>
      </JumbotronWrapper>
      <BodyContainer>
        <Container>
          {isLoggedIn ? (
            <>
              <SearchInput />
              <Button
                sx={{ mt: 2 }}
                variant="text"
                onClick={() => handleOpen("Add new Patient")}
                color="success"
                startIcon={<AddIcon />}
              >
                Add new patient
              </Button>
              <PatientCard />
            </>
          ) : <NotLoggedInBody/>}
        </Container>
      </BodyContainer>
      <Fade in={visible}>
        <Fab
          onClick={() => goToTop()}
          size="small"
          sx={{position: "fixed", bottom: 5, right: 5}}
          color="secondary"
        >
          <KeyboardArrowUpIcon fontSize="medium" />
        </Fab>
      </Fade>
    </>
  );
};

export default ManagePatients;

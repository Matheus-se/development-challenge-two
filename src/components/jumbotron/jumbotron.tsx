import { IJumbotronProps } from "../../data/interfaces/IJumbotronProps.interface";
import { JumbotronContainer } from "../../styles/components/jumbotron/style";
import { Fade, Slide, Typography } from "@mui/material";

const Jumbotron: React.FC<IJumbotronProps> = ({ theme }) => {
  return (
    <JumbotronContainer color={theme?.palette.secondary.main}>
      <Slide direction="up" in={true} timeout={500}>
          <div>
            <Fade timeout={1000} in={true}>
            <Typography
                className="header"
                fontSize={130}
                component="h1"
                variant="h1"
                color="white"
            >
                <b>PATIENTS</b>
            </Typography>
            </Fade>
          </div>
      </Slide>
    </JumbotronContainer>
  );
};

export default Jumbotron;

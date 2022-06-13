/* eslint-disable @next/next/no-img-element */
import { Box, Typography, useTheme, Grid } from "@mui/material";
import CloudWatch from "../../assets/cloudwatch.svg";
import Lambda from "../../assets/lambda.svg";
import Gateway from "../../assets/gateway.svg";
import Dynamo from "../../assets/dynamo.svg";
import Cognito from "../../assets/cognito.svg";
import Node from "../../assets/nodejs.svg";
import Next from "../../assets/nextjs.svg";
import Material from "../../assets/material.svg";
import Styled from "../../assets/styled.svg";
import Axios from "../../assets/axios.jpg";
import Vercel from "../../assets/vercel.svg";

const NotLoggedInBody = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          border: 1.5,
          borderColor: theme.palette.info.dark,
          p: 2,
          px: 4,
          bgcolor: "#cce5ff",
          borderRadius: 1,
        }}
      >
        <Typography color={theme.palette.info.dark}>
          Login is required to access the patient management panel. Accounts can
          only be created by administrators, if you don&apos;t already have an
          account, you can try this one: <br />
          E-mail: <b>test@test.com</b>
          <br />
          Password: <b>Test@123</b>
        </Typography>
      </Box>
      <Typography sx={{ mt: 5 }} fontWeight={700} variant="h2">
        SERVERLESS PATIENTS CRUD
      </Typography>
      <Typography>
        A web application to manage patients with cloud computing and storage.
      </Typography>
      <Typography sx={{ py: 8 }} fontWeight={700} variant="h4">
        BACK-END
      </Typography>
      <Grid container xs={12} rowSpacing={3} columnSpacing={2}>
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Node className="svg h-0" />
          </Box>
          <Typography sx={{mt: 3}} fontWeight={700} variant="h6">
            NODE.JS
          </Typography>
          <Typography>All lambda functions were made with node.js.</Typography>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Lambda className="svg" />
          </Box>
          <Typography sx={{mt: 3}} fontWeight={700} variant="h6">
            AWS LAMBDA
          </Typography>
          <Typography>A powerfull serverless computing service.</Typography>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Gateway className="svg" />
          </Box>
          <Typography sx={{mt: 3}} fontWeight={700} variant="h6">
            API GATEWAY
          </Typography>
          <Typography>
            AWS service for build, deploy and manage APIs including models and
            authorizations.
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Dynamo className="svg" />
          </Box>
          <Typography sx={{mt: 3}} fontWeight={700} variant="h6">
            DYNAMO DB
          </Typography>
          <Typography>
            A single table noSQL database with exceptional performance
            consistency, scale without fear.
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Cognito className="svg" />
          </Box>
          <Typography sx={{mt: 3}} fontWeight={700} variant="h6">
            COGNITO
          </Typography>
          <Typography>
            Consumer Identity Management and AWS Credentials for Federated
            Identities
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CloudWatch className="svg"></CloudWatch>
          </Box>
          <Typography sx={{mt: 3}} fontWeight={700} variant="h6">
            CLOUDWATCH
          </Typography>
          <Typography>
            AWS service for monitoring resources and applications.
          </Typography>
        </Grid>
      </Grid>
      <Typography sx={{ py: 8 }} fontWeight={700} variant="h4">
        FRONT-END
      </Typography>
      <Grid container xs={12} rowSpacing={3} columnSpacing={2}>
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Next className="svg h-0" />
          </Box>
          <Typography sx={{mt: 3}} fontWeight={700} variant="h6">
            NEXT.JS
          </Typography>
          <Typography>
            Server-side rendering and static site generation React framework.
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Material className="svg" />
          </Box>
          <Typography sx={{mt: 3}} fontWeight={700} variant="h6">
            Material UI
          </Typography>
          <Typography>Material design component library</Typography>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Styled className="svg" />
          </Box>
          <Typography sx={{mt: 3}} fontWeight={700} variant="h6">
            Styled Components
          </Typography>
          <Typography>
            Style-based component library for the component age 💅🏾.
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={Axios} alt="axios" width="50%" height="50%" />
          </Box>
          <Typography sx={{mt: 3}} fontWeight={700} variant="h6">
            Axios
          </Typography>
          <Typography>HTTP promise based client.</Typography>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Vercel className="svg"/>
          </Box>
          <Typography sx={{mt: 3}} fontWeight={700} variant="h6">
            Vercel
          </Typography>
          <Typography>Hosting with no problems.</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default NotLoggedInBody;

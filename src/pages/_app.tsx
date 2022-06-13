import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyle from "../styles/global";
import { createTheme, ThemeProvider } from "@mui/material";
import NavBar from "../components/navbar/navbar";
import { ModalProvider } from "../contexts/modal";
import { AlertProvider } from "../contexts/alert";
import { PatientsProvider } from "../contexts/patients";
import { SnackBarProvider } from "../contexts/snackbar";
import { UserPoolProvider } from "../contexts/userPool";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    typography: {
      body2: {
        display: "flex",
        alignItems: "center",
        fontSize: 15,
      },
    },
    palette: {
      primary: {
        main: "#001e3c",
      },
      secondary: {
        main: "#132f4c",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <SnackBarProvider>
          <PatientsProvider>
            <UserPoolProvider>
              <ModalProvider>
                <AlertProvider>
                  <CssBaseline />
                  <NavBar />
                  <Component {...pageProps} />
                  <GlobalStyle />
                </AlertProvider>
              </ModalProvider>
            </UserPoolProvider>
          </PatientsProvider>
        </SnackBarProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;

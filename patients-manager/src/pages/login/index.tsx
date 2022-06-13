import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Wave from "../../components/wave/wave";
import UserPoolContext from "../../contexts/userPool";
import GlobalStyles from "../../styles/pages/login/style";
import validator from "validator";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SnackBar from "../../components/snackbar/snackbar";

const Login = () => {
  const theme = useTheme();
  const { login, loading } = useContext(UserPoolContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [submited, setSubmited] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function validateEmail(emailVal: string) {
    if (validator.isEmail(emailVal)) {
      setError(() => false);
      setMessage(() => "");
      return;
    }

    setError(() => true);
    setMessage(() =>
      emailVal.length === 0 ? "E-mail is required" : "Invalid e-mail"
    );
  }

  function validatePassword(passwordVal: string) {
    if (passwordVal.length === 0) {
      setErrorPassword(() => true);
      return;
    }

    setErrorPassword(() => false);
  }

  function submit() {
    validatePassword(password);
    validateEmail(email);
    setSubmited(() => true);
  }

  useEffect(() => {
    if (error || errorPassword || !submited) {
      return;
    }

    setSubmited(() => false);
    login(email, password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit]);

  return (
    <>
      <SnackBar />
      <GlobalStyles />
      <Wave className="wave" color2="#ffffff" color1="#e2f2e6" theme={theme} />
      <Grid container xs={12} alignItems="center" justifyContent="center">
        <Grid
          className="login-container"
          item
          md={5}
          sx={{ bgcolor: "white", py: 4, px: 3, borderRadius: 2, mt: 5 }}
          direction="column"
          justifyContent="center"
        >
          <Typography variant="h4" sx={{ pb: 2 }}>
            <b>Login</b>
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <TextField
              type="email"
              fullWidth
              error={error}
              onChange={(e) => {
                setEmail(e.target.value);

                validateEmail(e.target.value);
              }}
              onBlur={(e) => {
                validateEmail(e.target.value);
              }}
              label="E-mail"
            ></TextField>
            {error ? (
              <Typography
                sx={{ p: 0, mx: 0, mt: 0.5, mb: -1 }}
                fontSize={12}
                color="error"
              >
                <b>{message}</b>
              </Typography>
            ) : null}
            <FormControl
              variant="outlined"
              sx={{ my: 2, mb: errorPassword ? 0 : 2 }}
            >
              <InputLabel
                error={errorPassword}
                htmlFor="outlined-adornment-password"
              >
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                fullWidth
                type={showPassword ? "text" : "password"}
                error={errorPassword}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                onBlur={(e) => {
                  validatePassword(e.target.value);
                }}
                label="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              ></OutlinedInput>
            </FormControl>
            {errorPassword ? (
              <Typography
                sx={{ p: 0, mx: 0, mt: 0.5, mb: 1 }}
                fontSize={12}
                color="error"
              >
                <b>Password is required</b>
              </Typography>
            ) : null}
            <Button
              disabled={loading}
              sx={{ py: 1 }}
              className="login-button"
              type="submit"
              variant="contained"
            >
              {loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                "LOGIN"
              )}
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;

import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputLabel,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/system";
import {
  useContext,
  useState,
  useMemo,
  useEffect,
  useRef,
  MutableRefObject,
} from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CloseIcon from "@mui/icons-material/Close";
import { modalStyles } from "../../styles/components/patientInfoModal/style";
import ModalContext from "../../contexts/modal";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import validator from "validator";
import { IAddPatientErrors } from "../../data/interfaces/IAddPatientErrors";
import PatientsContext from "../../contexts/patients";

const PatientInfoDialog: React.FC = () => {
  const style = modalStyles;
  const { open, title, handleClose, handleSubmit, handleUpdate, patient } =
    useContext(ModalContext);
  const [value, setValue] = useState<Date | null | string | undefined>(null);
  const [name, setName] = useState<string | undefined>("");
  const [email, setEmail] = useState<string | undefined>("");
  const [address, setAddress] = useState<string | undefined>("");
  const [city, setCity] = useState<string | undefined>("");
  const [state, setState] = useState<string | undefined>("");
  const [zip, setZip] = useState<string | undefined>("");
  const [errors, setErrors] = useState<IAddPatientErrors>(
    {} as IAddPatientErrors
  );
  const [submit, setSubmit] = useState(false);
  const { loading } = useContext(PatientsContext);
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const birthInput = useRef(null);
  const stateInput = useRef(null);
  const cityInput = useRef(null);
  const zipInput = useRef(null);
  const addressInput = useRef(null);

  function RequiredHelperText() {
    const { error } = useFormControl() || {};

    const helperText = useMemo(() => {
      if (error) {
        return "This field is required";
      }
    }, [error]);

    return <FormHelperText>{helperText}</FormHelperText>;
  }

  function handleChange(e: any) {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    if (onlyNums.length < 6) {
      setErrors({ ...errors, zip: true });
      setZip(onlyNums);
    } else if (onlyNums.length <= 8) {
      const number = onlyNums.replace(/(\d{5})(\d)/, "$1-$2");
      setErrors({ ...errors, zip: true });
      setZip(number);

      if (onlyNums.length >= 8) {
        setErrors({ ...errors, zip: false });
      }
    }
  }

  async function Submit() {
    await (nameInput.current as any)?.children[0].focus();
    await (emailInput.current as any).children[0].focus();
    await (birthInput.current as any).children[0].focus();
    await (addressInput.current as any).children[0].focus();
    await (cityInput.current as any).children[0].focus();
    await (stateInput.current as any).children[0].focus();
    await (zipInput.current as any).children[0].focus();
    await (zipInput.current as any).children[0].blur();

    setSubmit(true);
  }

  function clearData() {
    setValue(null);
    setName("");
    setEmail("");
    setState("");
    setCity("");
    setZip("");
    setAddress("");
    setSubmit(false);
    setErrors({} as IAddPatientErrors);
  }

  function closeModal() {
    clearData();
    handleClose();
  }

  useEffect(() => {
    if (Object.values(errors).includes(true)) {
      setSubmit(false);
      return;
    }

    if (name !== "" && submit) {
      if (patient?.id as string) {
        handleUpdate(
          {
            name,
            email: email !== patient?.email ? email : "",
            value,
            address,
            city,
            state,
            zip,
            id: patient?.id as string,
          },
          clearData
        );
      } else {
        handleSubmit(
          { name, email, value, address, city, state, zip },
          clearData
        );
      }
    }

    setSubmit(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit]);

  useEffect(() => {
    const patientBirth = new Date(patient?.value as string);

    setName(() => (patient?.name as string) || "");
    setEmail(() => (patient?.email as string) || "");
    setValue(() => patientBirth || null);
    setAddress(() => (patient?.address as string) || "");
    setZip(() => (patient?.zip as string) || "");
    setCity(() => (patient?.city as string) || "");
    setState(() => (patient?.state as string) || "");
  }, [patient]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        closeModal();
      }}
    >
      <Box sx={style}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 1.5 }}
        >
          <Grid item>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => {
                closeModal();
              }}
              color="error"
              edge="end"
            >
              <CloseIcon></CloseIcon>
            </IconButton>
          </Grid>
        </Grid>
        <Grid container rowSpacing={1.5} columnSpacing={1}>
          <Grid item xs={12}>
            <FormControl fullWidth error={errors?.name}>
              <InputLabel error={errors?.name} htmlFor="outlined-adornment">
                Name *
              </InputLabel>
              <OutlinedInput
                ref={nameInput}
                fullWidth
                label="Name"
                value={name}
                id="outlined-adornment"
                error={errors?.name}
                required
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors({ ...errors, name: false });
                }}
                onBlur={() => {
                  if (name?.length == 0) {
                    setErrors({ ...errors, name: true });
                  }
                }}
              />
              <RequiredHelperText />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={errors?.email}>
              <InputLabel error={errors?.email} htmlFor="outlined-adornment">
                E-mail *
              </InputLabel>
              <OutlinedInput
                ref={emailInput}
                fullWidth
                label="E-mail"
                value={email}
                id="outlined-adornment"
                error={errors?.email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (!validator.isEmail(email as string)) {
                    setErrors({ ...errors, email: true });
                    return;
                  }
                  setErrors({ ...errors, email: false });
                }}
                onBlur={() => {
                  if (!validator.isEmail(email as string)) {
                    setErrors({ ...errors, email: true });
                  }
                }}
              />
              <RequiredHelperText />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                className="date-picker"
                label="Birth"
                inputFormat="dd/MM/yyyy"
                value={value}
                disableFuture={true}
                onChange={(newValue) => {
                  setValue(newValue);
                  setErrors({ ...errors, birth: false });
                }}
                renderInput={(params) => (
                  <FormControl fullWidth error={params.error || errors?.birth}>
                    <InputLabel
                      error={params.error || errors?.birth}
                      htmlFor="outlined-adornment"
                    >
                      Birth *
                    </InputLabel>
                    <OutlinedInput
                      {...(params as any)}
                      ref={birthInput}
                      fullWidth
                      label="Birth"
                      id="outlined-adornment"
                      error={params.error || errors?.birth}
                      required
                      onBlur={() => {
                        if (!value) {
                          setErrors({ ...errors, birth: true });
                        }
                      }}
                    />
                    <RequiredHelperText />
                  </FormControl>
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={errors?.address}>
              <InputLabel error={errors?.address} htmlFor="outlined-adornment">
                Address *
              </InputLabel>
              <OutlinedInput
                ref={addressInput}
                fullWidth
                label="Address"
                value={address}
                id="outlined-adornment"
                error={errors?.address}
                required
                onChange={(e) => {
                  setAddress(e.target.value);
                  setErrors({ ...errors, address: false });
                }}
                onBlur={() => {
                  if (address?.length == 0) {
                    setErrors({ ...errors, address: true });
                  }
                }}
              />
              <RequiredHelperText />
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <FormControl fullWidth error={errors?.city}>
              <InputLabel error={errors?.city} htmlFor="outlined-adornment">
                City *
              </InputLabel>
              <OutlinedInput
                ref={cityInput}
                fullWidth
                value={city}
                label="City"
                id="outlined-adornment"
                error={errors?.city}
                required
                onChange={(e) => {
                  setCity(e.target.value);
                  setErrors({ ...errors, city: false });
                }}
                onBlur={() => {
                  if (city?.length == 0) {
                    setErrors({ ...errors, city: true });
                  }
                }}
              />
              <RequiredHelperText />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth error={errors?.state}>
              <InputLabel error={errors?.state} htmlFor="outlined-adornment">
                State *
              </InputLabel>
              <OutlinedInput
                ref={stateInput}
                inputProps={{ maxLength: 2 }}
                fullWidth
                label="State"
                value={state}
                id="outlined-adornment"
                error={errors?.state}
                required
                onChange={(e) => {
                  setState(e.target.value.toUpperCase());
                  setErrors({ ...errors, state: false });
                }}
                onBlur={() => {
                  if ((state?.length || 0) < 2) {
                    setErrors({ ...errors, state: true });
                  }
                }}
              />
              <RequiredHelperText />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth error={errors?.zip}>
              <InputLabel error={errors?.zip} htmlFor="outlined-adornment">
                Zip/Postal code *
              </InputLabel>
              <OutlinedInput
                ref={zipInput}
                fullWidth
                label="Zip/Postal code"
                id="outlined-adornment"
                error={errors?.zip}
                required
                value={zip}
                onChange={(e) => {
                  handleChange(e);
                }}
                onBlur={() => {
                  if ((zip?.length || 0) < 9) {
                    setErrors({ ...errors, zip: true });
                  }
                }}
              />
              <RequiredHelperText />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container xs={12} direction="row" justifyContent="flex-end">
          <Button
            onClick={() => {
              Submit();
            }}
            sx={{ mt: 1.5, mb: 1, borderRadius: 2.5, py: 1 }}
            variant="contained"
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Submit"
            )}
          </Button>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default PatientInfoDialog;

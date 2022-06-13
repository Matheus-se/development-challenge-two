import { createContext, useContext, useEffect, useState } from "react";
import { IContextProvider } from "../data/interfaces/IContextProvider.interface";
import { IPatientProvider } from "../data/interfaces/IPatientProvider.interface";
import { Patient } from "../data/models/Patient.model";
import { endpoints } from "../data/consts/endpoints/endpoints";
import { api } from "../data/consts/enviroment/enviroment";
import SnackBarContext from "../contexts/snackbar";
import { IAddPatient } from "../data/interfaces/IAddPatient.interface";

const PatientsContext = createContext<IPatientProvider>({} as IPatientProvider);

export const PatientsProvider: React.FC<IContextProvider> = ({ children }) => {
  const [lastId, setLastId] = useState<string | undefined>("");
  const [patients, setPatients] = useState([] as Patient[]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const { handleOpen: handleOpenSnack } = useContext(SnackBarContext);

  function loadPatients(refresh?: boolean) {
    if (refresh) {
      setLastId(() => "");
      setPatients(() => []);
    }

    if (lastId !== undefined || refresh) {
      setLoading(true);

      const lastIdParam = { lastId: refresh ? "" : lastId };

      const params = new URLSearchParams(lastIdParam as { lastId: string });

      api
        .get(endpoints.getPatients, { params })
        .then((res) => {
          setPatients((prev) => [...prev, ...res.data.Items]);
          setLastId(res.data?.LastEvaluatedKey?.id || undefined);
        })
        .catch((err) => {
          setLoading(() => false);
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  function searchPatients(search: string | null | undefined) {
    setLoading(() => true);
    setError(() => null);
    setPatients(() => []);

    const params = new URLSearchParams();

    if (search && typeof search === typeof "" && search.length > 0) {
      params.append("email", search);
      params.append("name", search);
      setLastId(() => undefined);
    } else {
      setLastId(() => "");
    }

    api
      .get(endpoints.getPatients, { params })
      .then((res) => {
        setPatients(() => res.data.Items);
        setLastId(res.data?.LastEvaluatedKey?.id || undefined);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function updatePatient(patient: IAddPatient): Promise<void> {
    setLoading(() => true);

    await api
      .patch(endpoints.updatePatient, {
        id: patient.id,
        name: patient.name,
        email: patient.email,
        birth: patient.value,
        address: {
          zip: patient.zip,
          info: patient.address,
          state: patient.state,
          city: patient.city,
        },
      })
      .then((res) => {
        console.log(res);
        setPatients(() =>
          patients.map((patientEl, i) => {
            if (patientEl.id === patient.id) {
              patients[i] = {
                id: patient.id,
                createdAt: patientEl.createdAt,
                name: patient.name as string,
                email: patient.email !== "" ? patient.email as string : patientEl.email,
                birth: patient.value as string,
                address: {
                  zip: patient.zip as string,
                  info: patient.address as string,
                  state: patient.state as string,
                  city: patient.city as string,
                },
              };
            }

            return patients[i];
          })
        );
        handleOpenSnack("Patient updated");
      })
      .catch((err) => {
        console.log("erro: ", err);
        handleOpenSnack(err.response.data.error, "error");
        throw new Error(err.response.data.error);
      })
      .finally(() => {
        setLoading(() => false);
      });
    return Promise.resolve();
  }

  function deletePatient(patientId: string) {
    api
      .delete(endpoints.deletePatient, { data: { id: patientId } })
      .then((res) => {
        console.log(patients, patientId);
        handleOpenSnack(res.data.message);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function addPatient(patient: IAddPatient): Promise<void> {
    setLoading(() => true);

    await api
      .post(endpoints.addPatient, {
        name: patient.name?.toLocaleLowerCase(),
        email: patient.email?.toLocaleLowerCase(),
        birth: patient.value,
        address: {
          zip: patient.zip,
          info: patient.address,
          state: patient.state,
          city: patient.city,
        },
      })
      .then((res) => {
        console.log(res);
        handleOpenSnack("Patient created");
        loadPatients(true);
      })
      .catch((err) => {
        console.log("erro: ", err);
        handleOpenSnack(err.response.data.error, "error");
        setLoading(() => false);
        throw new Error(err.response.data.error);
      })
      .finally(() => {});
    return Promise.resolve();
  }

  return (
    <PatientsContext.Provider
      value={{
        patients,
        loading,
        lastId,
        loadPatients,
        searchPatients,
        deletePatient,
        addPatient,
        updatePatient,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};

export default PatientsContext;

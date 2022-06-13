import { createContext, useContext, useState } from "react";
import { IModalProps } from "../data/interfaces/IModalProps.interface";
import { IContextProvider as ModalProviderProps } from "../data/interfaces/IContextProvider.interface";
import { IAddPatient } from "../data/interfaces/IAddPatient.interface";
import PatientsContext from "./patients";

const ModalContext = createContext<IModalProps>({} as IModalProps);

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const { addPatient, updatePatient, loading } = useContext(PatientsContext);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [patient, setPatient] = useState<IAddPatient | null | undefined>(null);
  
  function handleClose() {
    if (loading) {
      return;
    }
    setOpen(false);
  };

  const handleOpen = (title: string, patientModal?: IAddPatient) => {
    setOpen(true);
    setTitle(title);
    setPatient(patientModal);
  };

  async function handleUpdate(patient: IAddPatient, clearData: () => void) {
    updatePatient(patient).then(() => {
      handleClose();
      clearData();
    }).catch((err) => {
      console.log(err);
    });
  }

  async function handleSubmit(patient: IAddPatient, clearData: () => void) {
    patient.value = (patient.value as Date).toISOString();

    addPatient(patient).then(() => {
      handleClose();
      clearData();
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <ModalContext.Provider
      value={{ title, open, patient, handleClose, handleOpen, handleSubmit, handleUpdate }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContext;

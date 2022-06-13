import { IAddPatient } from './IAddPatient.interface';

export interface IModalProps {
  title: string;
  open: boolean;
  patient: IAddPatient | null | undefined,
  handleClose: () => void;
  handleOpen: (title: string, patient?: IAddPatient) => void;
  handleUpdate: (patient: IAddPatient, clearData: () => void) => void;
  handleSubmit: (patient: IAddPatient, clearData: () => void) => void;
};
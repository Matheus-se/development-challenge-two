import { IAddPatient } from './IAddPatient.interface';
import { Patient } from './../models/Patient.model';

export interface IPatientProvider {
    patients: Patient[],
    loading: boolean,
    lastId: string | undefined,
    loadPatients: (refresh?: boolean) => void,
    searchPatients: (search?: string | null) => void,
    deletePatient: (patientId: string) => void,
    addPatient: (patient: IAddPatient) => Promise<void>,
    updatePatient: (patient: IAddPatient) => Promise<void>,
}
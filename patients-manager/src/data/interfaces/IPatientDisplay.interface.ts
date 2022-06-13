import { Patient } from './../models/Patient.model';
export interface IPatientDisplay { 
    patient?: Patient;
    disabled: boolean;
    deleteButton?: JSX.Element; 
    editButton?: JSX.Element; 
}
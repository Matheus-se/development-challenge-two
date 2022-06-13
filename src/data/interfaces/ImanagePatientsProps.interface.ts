import { Patient } from '../models/Patient.model';
import { ILastEvaluatedKey } from './ILastEvaluatedKey.interface';

export interface IManagePatientsProps {
    Items: Patient[];
    Count: number;
    ScannedCount: number;
    LastEvaluatedKey?: ILastEvaluatedKey;
}
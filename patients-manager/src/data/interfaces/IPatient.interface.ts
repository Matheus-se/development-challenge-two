import { Address } from './../models/Address.model';

export interface IPatient {
    birth: string;
    createdAt: string;
    address: Address;
    id: string;
    email: string;
    name: string;
  }
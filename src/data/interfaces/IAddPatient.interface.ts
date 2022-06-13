export interface IAddPatient {
  name: string | undefined;
  email: string | undefined;
  value: Date | string | null | undefined;
  address: string | undefined;
  city: string | undefined;
  state: string | undefined;
  zip: string | undefined;
  id?: string;
}

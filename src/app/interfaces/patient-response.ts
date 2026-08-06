import { GeneralResponse } from "./general-response";

export interface PatientDTO {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  dateOfBirth: string | Date; 
}

export type PatientsResponse = GeneralResponse<PatientDTO[]>;

export type PatientResponse = GeneralResponse<PatientDTO>;



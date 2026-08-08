import { GeneralResponse } from "./general-response";

export interface PatientDTO {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string | Date; 
}

export interface PatientDTO2 extends PatientDTO 
{

} 

export type PatientsResponse = GeneralResponse<PatientDTO[]>;

export type PatientResponse = GeneralResponse<PatientDTO>;
//export type PatientallinfoResponse = GeneralResponse<PatientDTO2>;



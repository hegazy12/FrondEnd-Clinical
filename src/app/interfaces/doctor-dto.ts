import { GeneralResponse } from './general-response';


export interface DoctorDto0 {
  specialization: string;
  clinicName: string;
  clinicAddress: string;
  clinicPhoneNumber: string;
  clinicEmail: string;

}

export interface DoctorDto1 extends DoctorDto0 {
    fristName: string; 
    lastName: string;
    jobTitle: string;
    email: string;
    id: string;
}

export type DoctorsResponse = GeneralResponse<DoctorDto1[]>;

export type DoctorResponse = GeneralResponse<DoctorDto1>;
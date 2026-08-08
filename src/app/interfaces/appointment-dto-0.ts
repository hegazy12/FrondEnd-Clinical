import { GeneralResponse } from './general-response';
import { PatientDTO } from './patient-response';
import { DoctorDto1 } from './doctor-dto';
export interface AppointmentDTO0
{
  doctorId: string;          
  patientId: string;         
  appointmentDate: string | Date;   
  status: string;            
  notes?: string | null;     
  deposit: number;           
}

export interface AppointmentDTO1 extends AppointmentDTO0
{
  doctorFirstName: string;
  doctorLastName: string;
  doctorSpecialization: string;
  patientFirstName: string;
  patientLastName: string;
  id: string;                
}

export  interface AppointmentDTO2 extends AppointmentDTO1
{
   PatientDTO_1 : PatientDTO;
   DoctorDTO_1  : DoctorDto1 ;
}


export type AppointmentsResponse = GeneralResponse<AppointmentDTO1[]>;

export type AppointmentResponse = GeneralResponse<AppointmentDTO1>;

export type AppointmentAllinfo = GeneralResponse<AppointmentDTO2>;


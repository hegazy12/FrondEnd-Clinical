import { GeneralResponse } from './general-response';
import { PatientDTO } from './patient-response';
import { DoctorDto1 } from './doctor-dto';
import { Prescriptiondto2 } from './prescription';
import { saveMedicalExaminationDTO1 } from './medical-examinations-dto';
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

export interface AppointmentDTO2 extends AppointmentDTO1
{
   patientDTO_1 : PatientDTO;
   doctorDTO_1  : DoctorDto1 ;
}

export interface AppointmentDTO3 extends AppointmentDTO2{
    Prescriptiondto2 :Prescriptiondto2[];
    saveMedicalExaminationDTO1 : saveMedicalExaminationDTO1[];
    
}

export type AppointmentsResponse = GeneralResponse<AppointmentDTO1[]>;
export type AppointmentResponse = GeneralResponse<AppointmentDTO1>;
export type AppointmentAllinfo = GeneralResponse<AppointmentDTO2>;
export type makeCompleteResponse = GeneralResponse<number>;
export type AppointmentsStoryResponse = GeneralResponse<AppointmentDTO3>;


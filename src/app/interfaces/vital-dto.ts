import { GeneralResponse } from './general-response';
import { DoctorDto1 } from './doctor-dto'
import { AppointmentDTO1 } from './appointment-dto-0';

export interface VitalSignDto1 {
  id: string; 
  name: string;
  description: string;
  dataTypeName: string;
  maxValue: string;
  minValue: string;
  mastarName: string;
  listValues: string[]; 
}

export interface saveVitalSignDto 
{
  vitalSignId: string | undefined;
  appointmentId: string;
  value: string;
}

export interface saveVitalSignDto1 extends saveVitalSignDto  
{
  id: string;
}

export interface saveVitalSignDto2  extends saveVitalSignDto1  
{
  appointmentDTO1 : AppointmentDTO1;
  vitalSignDto1 : VitalSignDto1;
}

export type  VitalSignDtoResponse   = GeneralResponse<VitalSignDto1[]>;
export type  saveVitalSignResponse = GeneralResponse<saveVitalSignDto>;
export type  ListsaveVitalSignResponse = GeneralResponse<saveVitalSignDto2[]>;
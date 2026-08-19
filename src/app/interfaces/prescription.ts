import { GeneralResponse } from './general-response';
import { DoctorDto1 } from './doctor-dto';
import {DTODrug} from './dtodrug'

export interface Prescriptiondto 
{
  appointmentId: string; 
  drugId: string;    
  from: Date | string;         
  to: Date | string;            
  frequency: number | null;    
  type: number | null;          
  notes: string | null; 
}

export interface Prescriptiondto1 extends Prescriptiondto
{
   id :string
}

export interface Prescriptiondto2 extends Prescriptiondto1
{
   drug :DTODrug;
   doctor:DoctorDto1;
}

export type PrescriptionResponse = GeneralResponse<Prescriptiondto2[]>;
export type createPrescriptionResponse = GeneralResponse<Prescriptiondto1>;

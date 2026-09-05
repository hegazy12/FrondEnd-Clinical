import { GeneralResponse } from './general-response';
import { DoctorDto1 } from './doctor-dto'
import { AppointmentDTO2 } from './appointment-dto-0';

export interface MedicalExaminationsDTO {
  id : string;
  nameAr : string;
  code : string;
  nameEn : string;
  classificationId : string;
  classificationExaminationDTO1 : ClassificationExaminationDTO1 ;
}


export interface ClassificationExaminationDTO1 {
  id : string;
  categoryAr : string;
  categoryNameEn : string;
}


export interface saveMedicalExaminationDTO
{
  idExamination : string;
  idAppointment : string;
  note : string;
  last : number ;
} 

export interface saveMedicalExaminationDTO1 extends saveMedicalExaminationDTO{
    id : string ;
    doctorDTO : DoctorDto1 ;
    medicalExaminationsDTO : MedicalExaminationsDTO ;
}
 
export interface saveMedicalExaminationDTO2  extends saveMedicalExaminationDTO1{
    appointmentDTO_2 : AppointmentDTO2;
}


export type MedicalExaminationsResponse = GeneralResponse<MedicalExaminationsDTO[]>;
export type saveExaminationListResponse = GeneralResponse<saveMedicalExaminationDTO1[]>;
export type FullByIdResponse = GeneralResponse<saveMedicalExaminationDTO2>;
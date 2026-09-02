import { GeneralResponse } from "./general-response";


export interface CreateDiagnosDTO
{
  id: string;
  name: string | null;
  note: string;
  appointmentId: string;
}

export interface DiagnosDTO 
{
    notes: string;
    appointmentId: string;
    diagnosMasterId: string;
}

export interface DiagnosDTO1 extends DiagnosDTO
{   
    id: string;
}

export interface DiagnosDTO2 extends DiagnosDTO1
{
    diagnosMaster: MasterDiagnosDTO1;
}

export interface MasterDiagnosDTO
{
    name: string | undefined | null ;
    code: string;
}

export interface MasterDiagnosDTO1 extends MasterDiagnosDTO
{
    id: string;
}


export type CreateDiagnosisResponse = GeneralResponse<DiagnosDTO2>;
export type GetDiagnosisMasterResponse = GeneralResponse<MasterDiagnosDTO1[]>;
export type GetDiagnosisListResponse = GeneralResponse<DiagnosDTO2[]>;
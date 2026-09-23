import { GeneralResponse } from "./general-response";

export interface CheifComplaneDTO 
{
    text: string;
    appointmentId: string;
}


export interface CheifComplaneDTO1 extends  CheifComplaneDTO
{
   id:string
}

export type CreateCheifComplaneResponse = GeneralResponse<CheifComplaneDTO1>;
export type ListCheifComplaneResponse = GeneralResponse<CheifComplaneDTO1[]>;
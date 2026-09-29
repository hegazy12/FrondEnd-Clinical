import { GeneralResponse } from "./general-response";

export interface ServiceDTO {
    name: string;
    description: string;
    price: number;
    examinationId?: string | null;
    medicalExaminationId?: string | null;
}

export interface ServiceDTO1 extends ServiceDTO {
    id: string;
}

export type ServiceResponse = GeneralResponse<ServiceDTO1>;
export type ListServiceResponse = GeneralResponse<ServiceDTO1[]>;

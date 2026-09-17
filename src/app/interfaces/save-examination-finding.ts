import { ExaminationFindingDTO1 } from "./examination-finding";
import { GeneralResponse } from "./general-response";

export interface SaveExaminationFindingDTO {
    notes: string;
    appointmentId: string;
    examinationFindingId: string;
    value: string;
}

export interface SaveExaminationFindingDTO1 extends SaveExaminationFindingDTO {
    id: string;
}

export interface SaveExaminationFindingDTO2 extends SaveExaminationFindingDTO1 {
    examinationFindingDTO1: ExaminationFindingDTO1
}

export type ListSaveExaminationFindingResponse = GeneralResponse<SaveExaminationFindingDTO2[]>;
export type AddSaveExaminationFindingResponse = GeneralResponse<SaveExaminationFindingDTO1>;

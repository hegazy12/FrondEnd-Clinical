import { GeneralResponse } from "./general-response";
import { MainQuestionDTO1 } from "./main-question-dto";

export interface SaveMainQuestionDTO {
    notes: string;
    patientId: string;
    mainQuestionId: string;
    value: string;
}

export interface SaveMainQuestionDTO1 extends SaveMainQuestionDTO {
    id: string;
}

export interface SaveMainQuestionDTO2 extends SaveMainQuestionDTO1 {
    mainQuestionDTO1: MainQuestionDTO1 | null;
}

export type SaveMainQuestionResponse = GeneralResponse<SaveMainQuestionDTO1[]>
export type ListSaveMainQuestionResponse = GeneralResponse<SaveMainQuestionDTO2[]>






import { GeneralResponse } from "./general-response";
import { MainQuestionDTO } from "./main-question-dto";

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
    mainQuestion: MainQuestionDTO;
}

export type SaveMainQuestionResponse = GeneralResponse<SaveMainQuestionDTO1[]>
export type ListSaveMainQuestionResponse = GeneralResponse<SaveMainQuestionDTO2[]>






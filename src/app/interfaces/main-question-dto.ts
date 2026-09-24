import { GeneralResponse } from "./general-response";

export interface MainQuestionDTO {
    questionBody: string;
    description: string;
    dataTypeName: string;
    maxValue: string;
    minValue: string;
    requeried: boolean;
    listValues: string[];
    gendar: number;
    minage: number;
    maxage: number;
    requer: boolean;
}

export interface MainQuestionDTO1 extends MainQuestionDTO {
    id: string;
}



export type ListMainQuestionResponse = GeneralResponse<MainQuestionDTO1[]>;

export type SaveMainQuestionResponse = GeneralResponse<MainQuestionDTO1>;
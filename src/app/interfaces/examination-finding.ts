import { GeneralResponse } from "./general-response";

export interface ExaminationFindingDTO {
    name: string;
    description?: string;
}

export interface ExaminationFindingDTO1 extends ExaminationFindingDTO {
    id: string;
}


export type ExaminationFindingListResponse = GeneralResponse<ExaminationFindingDTO1[]>;  
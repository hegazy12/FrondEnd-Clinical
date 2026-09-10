import { GeneralResponse } from "./general-response";

export interface QuestionDTO
{
  sheetId: string;           
  questionBody: string;
  description: string;
  dataTypeName: string;
  maxValue: string;
  minValue: string;
  requeried: boolean;        
  listValues: string[];
  questionDependId: string |null; 
}

export interface QuestionDTO1 extends QuestionDTO
{
  id : string;
}

export type  QuestionListResponse   = GeneralResponse<QuestionDTO1[]>;
export type  SaveQuestionResponse = GeneralResponse<QuestionDTO1>;
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
  questionDependId: string; 
}

export interface QuestionDTO1
{
  Id : string;
}

export type  QuestionDtoResponse   = GeneralResponse<QuestionDTO1[]>;
export type  SaveQuestionResponse = GeneralResponse<QuestionDTO1>;
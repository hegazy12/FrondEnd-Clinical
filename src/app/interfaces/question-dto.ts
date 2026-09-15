import { GeneralResponse } from "./general-response";
import { SheetDto1 } from "./sheet-dto";

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

export interface saveQuestionDTO
{
  notes: string;
  appointmentId: string;
  questionId: string;
  sheetId: string;
  value: string;
}

export interface saveQuestionDTO1 extends saveQuestionDTO
{
  id : string;
}

export interface saveQuestionDTO2 extends saveQuestionDTO1
{
  questionDTO1 : QuestionDTO1,
  sheetDTO1 : SheetDto1
}



export type  QuestionListResponse    = GeneralResponse<QuestionDTO1[]>;
export type  SaveQuestionResponse    = GeneralResponse<QuestionDTO1>;
export type  SaveAnswersListResponse = GeneralResponse<saveQuestionDTO1[]>;
export type  GetsaveQuestionInSheetResponse  = GeneralResponse<saveQuestionDTO2[]>

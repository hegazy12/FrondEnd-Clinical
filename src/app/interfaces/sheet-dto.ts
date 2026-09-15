import { GeneralResponse } from "./general-response";

export interface SheetDto
{
    name : string;
}

export interface SheetDto1 extends SheetDto
{
    id: string;
}

export type  ListSheetResponse   = GeneralResponse<SheetDto1[]>;
export type  SheetsInAppointmentSavedResponse = GeneralResponse<SheetDto1[]>;
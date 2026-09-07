import { GeneralResponse } from "./general-response";

export interface SheetDto
{
    Name : string;
}

export interface SheetDto1 extends SheetDto
{
    Id: string;
}


export type  ListSheetResponse   = GeneralResponse<SheetDto1[]>;
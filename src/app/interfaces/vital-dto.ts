import { GeneralResponse } from './general-response';
import { DoctorDto1 } from './doctor-dto'

export interface VitalSignDto1 {
  id: string; // C# Guid maps to string in TypeScript
  name: string;
  description: string;
  dataTypeName: string;
  maxValue: string;
  minValue: string;
  mastarName: string;
  listValues: string[]; // C# List<string> maps to string[]
}

export type VitalSignDtoResponse = GeneralResponse<VitalSignDto1[]>;
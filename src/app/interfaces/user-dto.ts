import { GeneralResponse } from "./general-response";

export interface UserDto
{
  firstName: string;
  lastName: string;
  jobTitle: string;
  userName: string;
  email: string;
  password: string;
}

interface UserDto1 extends UserDto
{
  id: string;
  token: string;
  roles: string[];
  error: string | null;
  doctorId:string|null
}


export type RegisterResponse = GeneralResponse<UserDto1>;
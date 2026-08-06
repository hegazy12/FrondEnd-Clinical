import { GeneralResponse } from './general-response';

interface UserData
{
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  token: string;
  roles: string[];
  error: string | null;
}

export type LoginResponse = GeneralResponse<UserData>;
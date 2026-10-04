import { GeneralResponse } from "./general-response";

export interface RoleDto {
    id: string;
    name: string;
}

export type ListRoleesponse = GeneralResponse<RoleDto[]>;

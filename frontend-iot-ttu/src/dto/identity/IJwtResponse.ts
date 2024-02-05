import {IRole} from "./IRole";

export interface IJwtResponse{
    jwt: string,
    refreshToken: string,
    appUserId: string,
    username: string,
    roleIds: string[]
}
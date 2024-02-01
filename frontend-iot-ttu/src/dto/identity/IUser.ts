import {IBaseEntity} from "../IBaseEntity";
import {IRole} from "./IRole";

export interface IUser extends IBaseEntity{
    firstname: string;
    lastname: string;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    lockoutEnabled: boolean;
    roles: IRole[]
}
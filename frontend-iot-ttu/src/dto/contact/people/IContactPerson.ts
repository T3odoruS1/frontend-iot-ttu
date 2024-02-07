import {IBaseEntity} from "../../IBaseEntity";

export interface IContactPerson extends IBaseEntity{
    name: string,
    body: string;
}
import {IBaseEntity} from "../IBaseEntity";

export interface IBanner extends IBaseEntity{
    title:string;
    body: string;
    image: string;
}
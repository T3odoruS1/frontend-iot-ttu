import {IBaseEntity} from "../IBaseEntity";

export interface IBanner extends IBaseEntity{
    title:string;
    sequenceNumber: number;
    body: string;
    image: string;
}
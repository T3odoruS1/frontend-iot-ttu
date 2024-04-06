import {IBanner} from "../banner/IBanner";
import {IBaseEntity} from "../IBaseEntity";

export interface IAccessDetail extends IBaseEntity{
    email: string;
    date: string;
}
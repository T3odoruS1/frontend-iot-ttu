import {IBaseEntity} from "../IBaseEntity";
import {IAccessDetail} from "./IAccessDetail";

export interface IOpenSourceSolution extends IBaseEntity{
    title: string
    body: string
    link: string
    private: boolean
    createAt: string
    accessDetails: IAccessDetail[]
}
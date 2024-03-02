import {IBaseEntity} from "../IBaseEntity";

export interface IOpenSourceSolution extends IBaseEntity{
    title: string
    body: string
    link: string
    private: boolean
    createAt: string
}
import { IBaseEntity } from "../IBaseEntity";

export interface ITopicAreaWithCount extends IBaseEntity{
    name: string;
    count: number;
    children: ITopicAreaWithCount[];
}
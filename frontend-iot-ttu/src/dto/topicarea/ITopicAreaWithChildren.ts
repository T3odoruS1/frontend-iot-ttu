import { IBaseEntity } from "../IBaseEntity";
import { ITopicAreaGet } from "./ITopicAreaGet";

export interface ITopicAreaWithChildren extends IBaseEntity{
    name:string;
    childrenTopicAreas:ITopicAreaGet[] | null
}
import {IBaseEntity} from "../IBaseEntity";
import {IContent} from "../IContent";

export interface ITopicAreaGetMultilang extends IBaseEntity{
    // ID from IBaseEntity
    content: IContent[];
}
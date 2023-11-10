import {ITopicAreaGet} from "./topicarea/ITopicAreaGet";
import {IBaseEntity} from "./IBaseEntity";

export interface IOpenSourceSolution extends IBaseEntity{
    title: string;
    description: string;
    topicAreas: ITopicAreaGet[]
}
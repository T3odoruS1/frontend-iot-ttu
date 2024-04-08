import {IBaseEntity} from "../IBaseEntity";
import {ITopicAreaGet} from "../topicarea/ITopicAreaGet";

export interface INews extends IBaseEntity {
    title: string;
    body: string;
    author: string;
    image: string;
    viewCount: number;
    createdAt: string;
    topicAreas: ITopicAreaGet[];
}
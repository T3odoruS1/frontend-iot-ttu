import {IBaseEntity} from "../IBaseEntity";
import {ITopicAreaGet} from "../topicarea/ITopicAreaGet";

export interface IProject extends IBaseEntity {
    title: string,
    body: string,
    image?: string,
    createdAt: string,
    projectVolume: number,
    projectManager: string,
    year: number,
    topicAreas: ITopicAreaGet[]
}
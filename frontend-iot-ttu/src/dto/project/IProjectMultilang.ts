import {IContainsTopicArea} from "../IContainsTopicArea";
import {IContent} from "../IContent";
import {IBaseEntity} from "../IBaseEntity";

export interface IProjectMultilang extends IBaseEntity{
    createdAt: string,
    year: number,
    projectManager: string,
    projectVolume: number,
    image?: string | null | undefined, // TODO do we need this?
    title: IContent[],
    body: IContent[],
}
import {IContent} from "../IContent";
import {IContainsTopicArea} from "../IContainsTopicArea";

export interface IProjectOutput{
    id?: string,
    year: number,
    projectManager: string,
    projectVolume: number,
    image?: string | null | undefined, // TODO do we need this?
    title: IContent[],
    body: IContent[],
}
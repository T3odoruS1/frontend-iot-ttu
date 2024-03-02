import {IBaseEntity} from "../IBaseEntity";
import {IContent} from "../IContent";

export interface IOpenSourceSolutionMultilang extends IBaseEntity{
    title: IContent[]
    body: IContent[]
    link: string
    private: boolean
    createdAt: string
}
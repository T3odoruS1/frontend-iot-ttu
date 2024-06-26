import {IBaseEntity} from "../IBaseEntity";
import {IContent} from "../IContent";

export interface INewsWTranslations extends IBaseEntity{
    title: IContent[];
    createdAt: string;
    image: string;
    author: string;
    body: IContent[];
    topicAreas: {
        id: string;
    }[]
}
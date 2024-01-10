import { IContent } from "../IContent";
import {IContainsTopicArea} from "../IContainsTopicArea";

export interface INewsOutputDTO extends IContainsTopicArea{
    id?: string | null | undefined;    title: IContent[];
    body: IContent[];
    author: string;
    image: string;
}
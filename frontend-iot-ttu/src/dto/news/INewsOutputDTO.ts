import { IContent } from "../IContent";

export interface INewsOutputDTO{
    title: IContent[];
    body: IContent[];
    author: string;
    image: string;
    topicAreas: {
        id: string,
        title?: string,
        culture?:string;
    }[];
}
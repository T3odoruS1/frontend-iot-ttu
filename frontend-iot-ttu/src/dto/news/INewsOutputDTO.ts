import { IContent } from "../IContent";

export interface INewsOutputDTO{
    id?: string | null | undefined;    title: IContent[];
    body: IContent[];
    author: string;
    image: string;
    topicAreas: {
        id: string,
        title?: string,
        culture?:string;
    }[];
}
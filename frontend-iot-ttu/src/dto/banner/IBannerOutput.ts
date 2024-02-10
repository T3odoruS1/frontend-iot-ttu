import {IContent} from "../IContent";

export interface IBannerOutput{
    id?: string | null | undefined,
    title: IContent[];
    body: IContent[];
    image: string;
}
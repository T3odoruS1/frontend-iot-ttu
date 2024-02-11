import { IContent } from "../../IContent";

export interface IFeedPagePostOutput{
    feedPageCategoryId: string;
    title: IContent[];
    body: IContent[];
    createdAt: string;
}
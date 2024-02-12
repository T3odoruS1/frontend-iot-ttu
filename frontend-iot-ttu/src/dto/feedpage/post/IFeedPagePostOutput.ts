import { IContent } from "../../IContent";

export interface IFeedPagePostOutput{
    id?: string | null | undefined,
    feedPageCategoryId: string;
    title: IContent[];
    body: IContent[];
}
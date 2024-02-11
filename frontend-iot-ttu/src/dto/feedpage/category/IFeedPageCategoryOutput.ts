import { IContent } from "../../IContent";

export interface IFeedPageCategoryOutput{
    id?: string | null | undefined,
    feedPageId: string;
    title: IContent[];
}
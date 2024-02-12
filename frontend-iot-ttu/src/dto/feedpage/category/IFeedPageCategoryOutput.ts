import { IContent } from "../../IContent";

export interface IFeedPageCategoryOutput{
    id?: string | null | undefined,
    feedPageIdentifier: string;
    title: IContent[];
}
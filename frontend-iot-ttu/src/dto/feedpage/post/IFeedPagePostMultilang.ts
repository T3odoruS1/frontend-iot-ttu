import { IBaseEntity } from "../../IBaseEntity";
import { IContent } from "../../IContent";

export interface IFeedPagePostMultilang extends IBaseEntity{
    feedPageCategoryId: string;
    title: IContent[];
    body: IContent[];
    createdAt: string;
}
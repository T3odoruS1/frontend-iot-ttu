import { IBaseEntity } from "../../IBaseEntity";
import { IFeedPagePost } from "../post/IFeedPagePost";

export interface IFeedPageCategory extends IBaseEntity{
    feedPageId: string;
    title: string;
    feedPageCategoryPost: IFeedPagePost[];
}
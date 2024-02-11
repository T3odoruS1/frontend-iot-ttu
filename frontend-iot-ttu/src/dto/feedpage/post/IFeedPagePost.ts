import { IBaseEntity } from "../../IBaseEntity";

export interface IFeedPagePost extends IBaseEntity{
    feedPageCategoryId: string;
    title: string;
    body: string;
    createdAt: string;
}
import { IBaseEntity } from "../../IBaseEntity";
import { IFeedPageCategory } from "../category/IFeedPageCategory";

export interface IFeedPage extends IBaseEntity{
    feedPageName: string;
    feedPageCategories: IFeedPageCategory[];
}
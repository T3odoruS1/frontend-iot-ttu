import {IBaseEntity} from "../IBaseEntity";
import {ETechnologyPage} from "./ETechnologyPage";

export interface ITechnology extends IBaseEntity{ // Facebook style posts
    title: string;
    body: string;
    page: ETechnologyPage;
}
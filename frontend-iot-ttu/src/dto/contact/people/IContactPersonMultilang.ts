import {IBaseEntity} from "../../IBaseEntity";
import {IContent} from "../../IContent";

export interface IContactPersonMultilang extends IBaseEntity{
    name: string,
    body: IContent[]
}
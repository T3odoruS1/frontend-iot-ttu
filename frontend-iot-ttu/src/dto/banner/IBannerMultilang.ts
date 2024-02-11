import {IBaseEntity} from "../IBaseEntity";
import {IContent} from "../IContent";

export interface IBannerMultilang extends IBaseEntity{
    title: IContent[];
    body: IContent[];
    image: string;
    sequenceNumber: number;
}
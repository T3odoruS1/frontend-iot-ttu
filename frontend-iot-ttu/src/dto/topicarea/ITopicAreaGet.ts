import { IBaseEntity } from "../IBaseEntity";
import { IContent } from "../IContent";

export interface ITopicAreaGet extends IBaseEntity{
    name: string;
}


export interface ITopicAreaGetMultilang extends IBaseEntity{
    // ID from IBaseEntity
    childrenTopicAreas: ITopicAreaGetMultilang[];
    content: IContent[];
}




// /news/get/?width=500&height=300

// 16/9
























// Topic area return type

// Change endpoint to get news by id

// Image sizing

// UI designer
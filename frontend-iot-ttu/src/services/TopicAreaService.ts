import { ITopicAreaGet } from "../DTO/TopicArea/ITopicAreaGet";
import { BaseEntityService } from "./BaseEntityService";

export class NewsService extends BaseEntityService<ITopicAreaGet>{
    constructor(){
        super("");
    }
}
import { INews } from "../DTO/News/INews";
import { BaseEntityService } from "./BaseEntityService";

export class NewsService extends BaseEntityService<INews>{
    constructor(){
        super("");
    }
}
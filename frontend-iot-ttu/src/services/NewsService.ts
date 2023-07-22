import { INews } from "../DTO/INews";
import { BaseEntityService } from "./BaseEntityService";

export class NewsService extends BaseEntityService<INews>{
    constructor(){
        super("");
    }
}
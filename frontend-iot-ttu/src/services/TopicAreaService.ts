import {IBaseEntity} from "../dto/IBaseEntity";
import {ITopicAreaGet, ITopicAreaGetMultilang} from "../dto/topicarea/ITopicAreaGet";
import {ITopicAreaPost} from "../dto/topicarea/ITopicAreaPost";
import {BaseEntityService} from "./BaseEntityService";
import {ITopicAreaWithChildren} from "../dto/topicarea/ITopicAreaWithChildren";
import i18n from "i18next";
import {IErrorResponse} from "../dto/IErrorResponse";

export class TopicAreaService extends BaseEntityService {
    constructor() {
        super("");
    }

    create = async (topicArea: ITopicAreaPost): Promise<IBaseEntity | IErrorResponse | undefined> => {
        return await this.post<IBaseEntity>(`topicAreas`, topicArea);
    }

    getAll = async (lang: string): Promise<ITopicAreaWithChildren[] | undefined> => {
        return await this.get<ITopicAreaWithChildren[]>(`${lang}/topicAreas`);
    }

    getWithTranslations = async (): Promise<ITopicAreaGetMultilang[] | undefined> => {
        return await this.get<ITopicAreaGetMultilang[]>("topicAreas/getWithTranslation");
    }
}
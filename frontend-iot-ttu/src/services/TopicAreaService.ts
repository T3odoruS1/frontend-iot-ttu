import {IBaseEntity} from "../dto/IBaseEntity";
import {ITopicAreaGet, ITopicAreaGetMultilang} from "../dto/topicarea/ITopicAreaGet";
import {ITopicAreaPost} from "../dto/topicarea/ITopicAreaPost";
import {BaseEntityService} from "./BaseEntityService";
import {ITopicAreaWithChildren} from "../dto/topicarea/ITopicAreaWithChildren";
import i18n from "i18next";
import {IErrorResponse} from "../dto/IErrorResponse";
import {HttpClient} from "./HttpClient";
import {processResponse} from "./BaseService";

export class TopicAreaService extends HttpClient {
    constructor() {
        super("");
    }

    create = async (topicArea: ITopicAreaPost): Promise<IBaseEntity> => {
        return processResponse<IBaseEntity>(await this.post<IBaseEntity, IErrorResponse>(`topicAreas`, topicArea));
    }

    getAll = async (lang: string): Promise<ITopicAreaWithChildren[]> => {
        return processResponse<ITopicAreaWithChildren[]>(
            await this.get<ITopicAreaWithChildren[],IErrorResponse>(`${lang}/topicAreas`)
        );
    }

    getWithTranslations = async (): Promise<ITopicAreaGetMultilang[]> => {
        return processResponse<ITopicAreaGetMultilang[]>(
            await this.get<ITopicAreaGetMultilang[], IErrorResponse>("topicAreas/getWithTranslation")
        )
    }
}
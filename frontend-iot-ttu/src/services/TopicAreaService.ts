import {IBaseEntity} from "../dto/IBaseEntity";
import {ITopicAreaGet, ITopicAreaGetMultilang} from "../dto/topicarea/ITopicAreaGet";
import {ITopicAreaPost} from "../dto/topicarea/ITopicAreaPost";
import {BaseEntityService} from "./BaseEntityService";

export class TopicAreaService extends BaseEntityService {
    constructor() {
        super("");
    }

    create = async (topicArea: ITopicAreaPost): Promise<IBaseEntity | undefined> => {
        return await this.post<IBaseEntity>(`/en/topicAreas/create`, topicArea);
    }

    getAll = async (lang: string): Promise<ITopicAreaGet[] | undefined> => {
        return await this.get<ITopicAreaGet[]>(`${lang}/topicAreas/get`);
    }

    getWithTranslations = async (): Promise<ITopicAreaGetMultilang[] | undefined> => {
        return await this.get<ITopicAreaGetMultilang[]>("en/topicAreas/getWithTranslation");
    }

}
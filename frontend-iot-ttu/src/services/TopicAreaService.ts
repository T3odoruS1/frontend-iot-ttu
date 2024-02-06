import {IBaseEntity} from "../dto/IBaseEntity";
import {ITopicAreaGetMultilang} from "../dto/topicarea/ITopicAreaGet";
import {ITopicAreaPost} from "../dto/topicarea/ITopicAreaPost";
import {ITopicAreaWithChildren} from "../dto/topicarea/ITopicAreaWithChildren";
import {IErrorResponse} from "../dto/IErrorResponse";
import {HttpClient} from "./HttpClient";
import {processResponse} from "./BaseService";
import {BaseClient} from "./BaseClient";

export class TopicAreaService {
    private client: BaseClient = BaseClient.getInstance();


    create = async (topicArea: ITopicAreaPost): Promise<IBaseEntity> => {
        return processResponse<IBaseEntity>(await this.client.post<IBaseEntity, IErrorResponse>(`topicAreas`, topicArea));
    }

    getAll = async (lang: string): Promise<ITopicAreaWithChildren[]> => {
        return processResponse<ITopicAreaWithChildren[]>(
            await this.client.get<ITopicAreaWithChildren[],IErrorResponse>(`/topicAreas/${lang}`)
        );
    }

    getWithTranslations = async (): Promise<ITopicAreaGetMultilang[]> => {
        return processResponse<ITopicAreaGetMultilang[]>(
            await this.client.get<ITopicAreaGetMultilang[], IErrorResponse>("topicAreas/getWithTranslation")
        )
    }
}
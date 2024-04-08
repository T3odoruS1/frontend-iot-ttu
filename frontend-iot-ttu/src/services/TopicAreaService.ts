import {IBaseEntity} from "../dto/IBaseEntity";
import {ITopicAreaGet, ITopicAreaGetMultilang} from "../dto/topicarea/ITopicAreaGet";
import {ITopicAreaPost} from "../dto/topicarea/ITopicAreaPost";
import {IErrorResponse} from "../dto/IErrorResponse";
import {processResponse} from "../httpclient/responseProcessor";
import {HttpClient} from "../httpclient/HttpClient";
import {ITopicAreaWithCount} from "../dto/topicarea/ITopicAreaWithCount";

export class TopicAreaService {
    private client: HttpClient = HttpClient.getInstance();


    create = async (topicArea: ITopicAreaPost): Promise<IBaseEntity> => {
        return processResponse<IBaseEntity>(await this.client.postAuthenticated<IBaseEntity, IErrorResponse>(`topicAreas`, topicArea));
    }

    getAll = async (lang: string): Promise<ITopicAreaWithCount[]> => {
        return processResponse<ITopicAreaWithCount[]>(
            await this.client.get<ITopicAreaWithCount[],IErrorResponse>(`/topicAreas/${lang}/withCount`)
        );
    }

    getWithTranslations = async (): Promise<ITopicAreaGetMultilang[]> => {
        return processResponse<ITopicAreaGetMultilang[]>(
            await this.client.get<ITopicAreaGetMultilang[], IErrorResponse>("topicAreas/getWithTranslation")
        )
    }

    remove = async (id: string): Promise<void> => {
        return processResponse<void>(
            await this.client.deleteAuthenticated<void, IErrorResponse>(`/topicAreas/${id}`)
        )
    }
}
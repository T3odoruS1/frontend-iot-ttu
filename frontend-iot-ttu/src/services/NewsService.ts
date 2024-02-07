import {INews} from "../dto/news/INews";
import {INewsOutputDTO} from "../dto/news/INewsOutputDTO";
import {IErrorResponse} from "../dto/IErrorResponse";
import {INewsWTranslations} from "../dto/news/INewsWTranslations";
import {IPaginatedService} from "./IPaginatedService";
import {processResponse} from "../httpclient/responseProcessor";
import {HttpClient} from "../httpclient/HttpClient";

export class NewsService implements IPaginatedService<INews> {

    private client: HttpClient = HttpClient.getInstance();

    getAll = async (lang: string, page: number = 0, size: number = 500, topicAreaId: string | null = null): Promise<INews[]> => {
        const response =
            await this.client.get<INews[], IErrorResponse>(`news/${lang}?page=${page}&size=${size}` + (topicAreaId ? `&topicAreaId=${topicAreaId}` : ""));

        console.log(response)
        return processResponse<INews[]>(response);
    }

    getCount = async (topicAreaId: string | null = null): Promise<number> => {
        const response = await this.client.get<number, IErrorResponse>("news/count" + (topicAreaId ? `/${topicAreaId}` : ""));
        return processResponse<number>(response);
    }

    getById = async (lang: string, id: string): Promise<INews> => {
        const response = await this.client.get<INews, IErrorResponse>(`news/${lang}/${id}`);
        return processResponse<INews>(response);
    }

    create = async (data: INewsOutputDTO): Promise<{ id: string }> => {
        const response = await this.client.post<{id: string}, IErrorResponse>(`/news`, data);
        return processResponse<{id: string}>(response);
    }

    remove = async (id: string): Promise<void> => {
        const response = await this.client.delete<void, IErrorResponse>(`/news/${id}`);
        return processResponse<void>(response);
    }


    update = async (data: {}): Promise<void> => {
        const response = await this.client.put<void, IErrorResponse>(`/news/`, data);
        return processResponse<void>(response);
    }

    getMultiLang = async (id: string): Promise<INewsWTranslations> => {
        const response = await this.client.get<INewsWTranslations, IErrorResponse>(`news/preview/${id}`);
        return processResponse<INewsWTranslations>(response);
    }
}
import {BaseEntityService} from "./BaseEntityService";
import {INews} from "../dto/news/INews";
import {INewsOutputDTO} from "../dto/news/INewsOutputDTO";
import {IErrorResponse} from "../dto/IErrorResponse";
import {INewsWTranslations} from "../dto/news/INewsWTranslations";
import {IPaginatedService} from "./IPaginatedService";
import {HttpClient} from "./HttpClient";
import {processResponse} from "./BaseService";

export class NewsService extends HttpClient implements IPaginatedService<INews> {
    constructor() {
        super("");
    }

    getAll = async (lang: string, page: number = 0, size: number = 500): Promise<INews[]> => {
        const response =
            await this.getAuthenticated<INews[], IErrorResponse>(`news/${lang}`);
            // ?page=${page}&size=${size}
        console.log(response)
        return processResponse<INews[]>(response);
    }

    getCount = async (): Promise<number> => {
        const response = await this.get<number, IErrorResponse>("news/count");
        return processResponse<number>(response);
    }

    getById = async (lang: string, id: string): Promise<INews> => {
        const response = await this.get<INews, IErrorResponse>(`news/${lang}/${id}`);
        return processResponse<INews>(response);
    }

    create = async (data: INewsOutputDTO): Promise<{ id: string }> => {
        const response = await this.post<{id: string}, IErrorResponse>(`/news`, data);
        return processResponse<{id: string}>(response);
    }

    remove = async (id: string): Promise<void> => {
        const response = await this.delete<void, IErrorResponse>(`/news/${id}`);
        return processResponse<void>(response);
    }


    update = async (data: {}): Promise<void> => {
        const response = await this.put<void, IErrorResponse>(`/news/`, data);
        return processResponse<void>(response);
    }

    getMultiLang = async (id: string): Promise<INewsWTranslations> => {
        const response = await this.get<INewsWTranslations, IErrorResponse>(`news/preview/${id}`);
        return processResponse<INewsWTranslations>(response);
    }
}
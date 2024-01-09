import {BaseEntityService} from "./BaseEntityService";
import {INews} from "../dto/news/INews";
import {INewsOutputDTO} from "../dto/news/INewsOutputDTO";
import {IErrorResponse} from "../dto/IErrorResponse";
import {INewsWTranslations} from "../dto/news/INewsWTranslations";
import {IPaginatedService} from "./IPaginatedService";

export class NewsService extends BaseEntityService implements IPaginatedService<INews>{
    constructor() {
        super("");
    }

    getAll = async (lang: string, page: number = 0, size: number = 500): Promise<INews[] | undefined> => {
        return await this.get<INews[] | undefined>(`${lang}/news?page=${page}&size=${size}`);
    }

    getCount = async (): Promise<number | undefined> =>  {
        // return await this.get<number | undefined>(`project/count`)
        return Promise.resolve((await this.getAll("et"))?.length);
    }

    getById = async (lang: string, id: string): Promise<INews | undefined> => {
        return await this.get<INews>(`${lang}/news/${id}`);
    }

    create = async (data: INewsOutputDTO): Promise<{ id: string } | IErrorResponse | undefined> => {
        return await this.post<{ id: string } | IErrorResponse | undefined>(`/news`, data);
    }

    remove = async (id: string): Promise<void | IErrorResponse> => {
        return await this.delete<void>(`/news/${id}`);
    }



    update = async(data: {}): Promise<void | IErrorResponse> => {
        return await this.put<void>(`/news/`, data);
    }

    getMultiLang = async (id: string): Promise<INewsWTranslations | IErrorResponse | undefined> =>{
        return await this.get<INewsWTranslations | IErrorResponse | undefined>(`news/preview/${id}`);
    }
}
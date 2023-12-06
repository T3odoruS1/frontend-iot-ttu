import {BaseEntityService} from "./BaseEntityService";
import {INews} from "../dto/news/INews";
import i18n from "i18next";
import {INewsOutputDTO} from "../dto/news/INewsOutputDTO";
import {IErrorResponse} from "../dto/IErrorResponse";

export class NewsService extends BaseEntityService {
    constructor() {
        super("");
    }

    getAll = async (lang: string): Promise<INews[] | undefined> => {
        return await this.get<INews[]>(`${lang}/news`);
    }

    getById = async (lang: string, id: string): Promise<INews| undefined> => {
        return await this.get<INews>(`${lang}/news/${id}`);
    }

    create = async (data: INewsOutputDTO): Promise<{id: string}| IErrorResponse | undefined> => {
        return await this.post(`/news`, data);
    }

    remove = async (id: string): Promise<void> => {
        return await this.delete(`/news/${id}`);
    }
}
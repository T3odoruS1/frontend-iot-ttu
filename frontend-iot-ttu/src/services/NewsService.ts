import {BaseEntityService} from "./BaseEntityService";
import {INews} from "../dto/news/INews";
import i18n from "i18next";
import {INewsOutputDTO} from "../dto/news/INewsOutputDTO";

export class NewsService extends BaseEntityService {
    constructor() {
        super("");
    }

    getAll = async (lang: string): Promise<INews[] | undefined> => {
        return await this.get<INews[]>(`${lang}/news/get`);
    }

    getById = async (lang: string, id: string): Promise<INews| undefined> => {
        return await this.get<INews>(`${lang}/news/getById?id=${id}`);
    }

    create = async (data: INewsOutputDTO): Promise<{id: string} | undefined> => {
        return await this.post(`/et/news/create`, data);
    }
}
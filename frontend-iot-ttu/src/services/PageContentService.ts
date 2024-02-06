import {HttpClient} from "./HttpClient";
import {IPageContentMultilang} from "../dto/pageContent/IPageContentMultilang";
import {IErrorResponse} from "../dto/IErrorResponse";
import {processResponse} from "./BaseService";
import {IPageContent} from "../dto/pageContent/IPageContent";
import {BaseClient} from "./BaseClient";

export class PageContentService extends BaseClient {
    constructor() {
        super("");
    }

    create = async (data: IPageContentMultilang): Promise<IPageContentMultilang> => {
        const response = await this.postAuthenticated<IPageContentMultilang, IErrorResponse>("pageContent", data);
        return processResponse<IPageContentMultilang>(response);
    }

    getMultilang = async (pageIdentifier: string): Promise<IPageContentMultilang> => {
        const response = await this.get<IPageContentMultilang, IErrorResponse>(`pagecontent/${pageIdentifier}`);
        return processResponse<IPageContentMultilang>(response);
    }

    getContent = async (pageIdentifier: string, lang: string): Promise<IPageContent> => {
        const response = await this.get<IPageContent, IErrorResponse>(`pagecontent/${lang}/${pageIdentifier}`);
        return processResponse<IPageContent>(response);
    }

    update = async (data: IPageContentMultilang): Promise<void> => {
        const response =
            await this.putAuthenticated<void, IErrorResponse>(`pagecontent/${data.pageIdentifier}`, data);
        return processResponse<void>(response);
    }

}
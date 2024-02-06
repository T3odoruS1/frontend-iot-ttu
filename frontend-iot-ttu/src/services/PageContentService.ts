import {HttpClient} from "./HttpClient";
import {IPageContentMultilang} from "../dto/pageContent/IPageContentMultilang";
import {IErrorResponse} from "../dto/IErrorResponse";
import {processResponse} from "./BaseService";
import {IPageContent} from "../dto/pageContent/IPageContent";
import {BaseClient} from "./BaseClient";

export class PageContentService {
    private client: BaseClient = BaseClient.getInstance();


    create = async (data: IPageContentMultilang): Promise<IPageContentMultilang> => {
        const response = await this.client.postAuthenticated<IPageContentMultilang, IErrorResponse>("pageContent", data);
        return processResponse<IPageContentMultilang>(response);
    }

    getMultilang = async (pageIdentifier: string): Promise<IPageContentMultilang> => {
        const response = await this.client.get<IPageContentMultilang, IErrorResponse>(`pagecontent/${pageIdentifier}`);
        return processResponse<IPageContentMultilang>(response);
    }

    getContent = async (pageIdentifier: string, lang: string): Promise<IPageContent> => {
        const response = await this.client.get<IPageContent, IErrorResponse>(`pagecontent/${lang}/${pageIdentifier}`);
        return processResponse<IPageContent>(response);
    }

    update = async (data: IPageContentMultilang): Promise<void> => {
        const response =
            await this.client.putAuthenticated<void, IErrorResponse>(`pagecontent/${data.pageIdentifier}`, data);
        return processResponse<void>(response);
    }

}
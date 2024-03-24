import {HttpClient} from "../httpclient/HttpClient";
import {IOpenSourceSolutionOutput} from "../dto/opensourcesolutions/IOpenSourceSolutionOutput";
import {IOpenSourceSolutionMultilang} from "../dto/opensourcesolutions/IOpenSourceSolutionMultilang";
import {processResponse} from "../httpclient/responseProcessor";
import {IErrorResponse} from "../dto/IErrorResponse";
import {IOpenSourceSolution} from "../dto/opensourcesolutions/IOpenSourceSolution";
import {IRequestOSSAccess} from "../dto/opensourcesolutions/IRequestOSSAccess";

export class OpenSourceSolutionService{
    private client: HttpClient = HttpClient.getInstance();

    private baseUrl: string = "openSourceSolution"

    create = async (data: IOpenSourceSolutionOutput): Promise<IOpenSourceSolutionMultilang> => {
        return processResponse<IOpenSourceSolutionMultilang>(
            await this.client.postAuthenticated<IOpenSourceSolutionMultilang, IErrorResponse>(this.baseUrl, data)
        );
    }

    update = async (data: IOpenSourceSolutionOutput): Promise<void> => {
        return processResponse<void>(
            await this.client.putAuthenticated<void, IErrorResponse>(this.baseUrl, data)
        );
    }

    delete = async (id: string): Promise<void> => {
        return processResponse<void>(
            await this.client.deleteAuthenticated<void, IErrorResponse>(`${this.baseUrl}/${id}`)
        );
    }

    getMultilang = async (id: string): Promise<IOpenSourceSolutionMultilang> => {
        return processResponse<IOpenSourceSolutionMultilang>(
            await this.client.get<IOpenSourceSolutionMultilang, IErrorResponse>(`${this.baseUrl}/preview/${id}`)
        );
    }

    getById = async (lang: string, id: string): Promise<IOpenSourceSolution> => {
        return processResponse<IOpenSourceSolution>(
            await this.client.get<IOpenSourceSolution, IErrorResponse>(`${this.baseUrl}/${lang}/${id}`)
        );
    }

    getAll =async (lang:string): Promise<IOpenSourceSolution[]> => {
        return processResponse<IOpenSourceSolution[]>(
            await this.client.get<IOpenSourceSolution[], IErrorResponse>(`${this.baseUrl}/${lang}`)
        );
    }

    count = async (): Promise<number> => {
        return processResponse<number>(
            await this.client.get<number, IErrorResponse>(`${this.baseUrl}/count`)
        );
    }

    getAccess = async (data: IRequestOSSAccess, lang: string): Promise<void> => {
        return processResponse<void>(
            await this.client.post<void, IErrorResponse>(`${this.baseUrl}/${lang}/requestAccess`, data)
        );
    }





}
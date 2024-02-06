import {IProjectOutput} from "../dto/project/IProjectOutput";
import {IProject} from "../dto/project/IProject";
import {IErrorResponse} from "../dto/IErrorResponse";
import {IPaginatedService} from "./IPaginatedService";
import {processResponse} from "./responseProcessor";
import {IBaseEntity} from "../dto/IBaseEntity";
import {dummyPage} from "../assets/loremIpsumDummy";
import {IProjectMultilang} from "../dto/project/IProjectMultilang";
import {HttpClient} from "./HttpClient";

export class ProjectService implements IPaginatedService<IProject> {
    private client: HttpClient = HttpClient.getInstance();

    create = async (data: IProjectOutput): Promise<IBaseEntity> => {
        const result = await this.client.post<IBaseEntity, IErrorResponse>(`/project`, data);
        return processResponse<IBaseEntity>(result);

    }

    getAll = async (lang: string, page: number = 0, size: number = 500): Promise<IProject[]> => {
        const result = await this.client.getAuthenticated<IProject[], IErrorResponse>(`/project/${lang}`);
        return processResponse<IProject[]>(result);
    }

    getById = async (lang: string, id: string): Promise<IProject> => {
        const result = await this.client.get<IProject, IErrorResponse>(`/project/${lang}/${id}`);
        return processResponse<IProject>(result);
    }

    getCount = async (): Promise<number> => {
        const result = await this.client.get<number, IErrorResponse>(`project/count`);
        return processResponse<number>(result);
    }

    remove = async (id: string): Promise<void> => {
        const result = await this.client.delete<void, IErrorResponse>(`/project/${id}`);
        return processResponse<void>(result);

    }

    update = async (data: IProjectOutput): Promise<void> => {
        const result = await this.client.putAuthenticated<void, IErrorResponse>("project", data);
        return processResponse<void>(result);
    }

    getPreview = async (id: string):Promise<IProjectMultilang> => {
        const result = await this.client.get<IProjectMultilang, IErrorResponse>(`project/preview/${id}`);
        return processResponse<IProjectMultilang>(result);
    }

}
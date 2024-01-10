import {BaseEntityService} from "./BaseEntityService";
import {IProjectOutput} from "../dto/project/IProjectOutput";
import {IProject} from "../dto/project/IProject";
import {IErrorResponse} from "../dto/IErrorResponse";
import {IPaginatedService} from "./IPaginatedService";
import {HttpClient} from "./HttpClient";

export class ProjectService extends HttpClient

    // implements IPaginatedService<IProject>

{
    constructor() {
        super("");
    }

    //
    // create = async (data: IProjectOutput): Promise<IProject | IErrorResponse | undefined> => {
    //     return await this.post<IProject | IErrorResponse | undefined>(`/project`, data);
    // }
    //
    // getAll = async (lang: string, page: number = 0, size: number = 500): Promise<IProject[]> => {
    //     const result = await this.get<IProject[], IErr
    //     return await this.get<IProject[], IErrorResponse>(`/${lang}/project`);
    // }
    //
    // getById = async (lang: string, id: string): Promise<IProject | IErrorResponse | undefined> => {
    //     return await this.get<IProject | IErrorResponse | undefined>(`${lang}/project/${id}`);
    // }
    //
    // getCount = async (): Promise<number | undefined> => {
    //     return await this.get<number | undefined>(`project/count`)
    // }
    //
    // remove = async (id: string): Promise<void | IErrorResponse> => {
    //     return await this.delete(`/project/${id}`)
    // }
}

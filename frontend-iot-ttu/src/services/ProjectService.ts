import {IProjectOutput} from "../dto/project/IProjectOutput";
import {IProject} from "../dto/project/IProject";
import {IErrorResponse} from "../dto/IErrorResponse";
import {IPaginatedService} from "./IPaginatedService";
import {HttpClient} from "./HttpClient";
import {processResponse} from "./BaseService";
import {IBaseEntity} from "../dto/IBaseEntity";
import {HttpStatusCode} from "axios";
import {dummyPage} from "../assets/loremIpsumDummy";

export class ProjectService extends HttpClient implements IPaginatedService<IProject> {
    constructor() {
        super("");
    }


    create = async (data: IProjectOutput): Promise<IBaseEntity> => {
        // const result = await this.post<IBaseEntity, IErrorResponse>(`/project`, data);
        // return processResponse<IBaseEntity>(result);
        return processResponse<IBaseEntity>({data: createDummy, status: HttpStatusCode.Ok});

    }

    getAll = async (lang: string, page: number = 0, size: number = 500): Promise<IProject[]> => {
        // const result = await this.get<IProject[], IErrorResponse>(`/${lang}/project`);
        // return processResponse<IProject[]>(result);
        return processResponse<IProject[]>({data: dummyProjects, status: HttpStatusCode.Ok});

    }

    getById = async (lang: string, id: string): Promise<IProject> => {
        // const result = await this.get<IProject, IErrorResponse>(`${lang}/project/${id}`);
        // return processResponse<IProject>(result);
        const project = dummyProjects.find(p => p.id === id);
        return processResponse<IProject>({data: project, status: HttpStatusCode.Ok});
    }

    getCount = async (): Promise<number> => {
        // const result = await this.get<number, IErrorResponse>(`project/count`);
        // return processResponse<number>(result);
        return processResponse<number>({data: 10, status: HttpStatusCode.Ok});
    }

    remove = async (id: string): Promise<void> => {
        const result = await this.delete<void, IErrorResponse>(`/project/${id}`);
        return processResponse<void>(result);

    }
}


const createDummy = {
    id: "73a41b77-7314-4ceb-94f0-73efbe55e63c"
}

const dummyProjects: IProject[] = [];

for (let i = 1; i <= 10; i++) {
    const data = {
        id: `c7d8e9f0-1g2h-3i4j-5k6l-7m8n9o0paqbr${i}`,
        title: `Project Title very very long. Some useful stuff is stored here. Check it out! ${i}`,
        body: dummyPage,
        image: `image${i}.jpg`,
        createdAt: `2024-04-0${i}`,
        projectVolume: i * 100000,
        projectManager: `Manager ${i}`,
        year: 2024,
        topicAreas: [
            { id: `c1s2t3u4-v5w6-x7y8-z9a0-b1c2d3e4f5g6${i}`, name: `Topic Area ${i}` },
            { id: `h7i8j9k0-l1m2-n3o4-p5q6-r7s8t9u0v1w2${i}`, name: `Topic Area ${i}` }
        ]
    };

    dummyProjects.push(data);
}
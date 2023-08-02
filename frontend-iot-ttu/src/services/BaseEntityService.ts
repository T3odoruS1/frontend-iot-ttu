import { IBaseEntity } from "../DTO/IBaseEntity";
import { BaseService } from "./BaseService";

export abstract class BaseEntityService extends BaseService {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(baseUrl: string){
        super(baseUrl);
    }
    async post<TEntity>(url: string, data: {}): Promise<TEntity | undefined>{
        let response = await  this.axios.post(url, data)
        return response.data;
    }

    async get<TEntity>(url: string): Promise<TEntity | undefined>{
        return await  this.axios.get(url)
    }
}

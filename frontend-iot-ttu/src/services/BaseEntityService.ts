import { IBaseEntity } from "../dto/IBaseEntity";
import { BaseService } from "./BaseService";
import {AxiosError} from "axios";
import {IErrorResponse} from "../dto/IErrorResponse";

export abstract class BaseEntityService extends BaseService {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(baseUrl: string){
        super(baseUrl);
    }
    async post<TEntity>(url: string, data: {}): Promise<TEntity | IErrorResponse | undefined>{
        try{
            return await this.axios.post(url, data)
        }catch (error){
            return (error as AxiosError)!.response!.data as IErrorResponse;
        }

    }

    async get<TEntity>(url: string): Promise<TEntity | undefined>{
        return (await this.axios.get(url)).data
    }

    async delete<TEntity>(url: string): Promise<void | undefined>{
        return (await this.axios.delete(url)).data
    }


}

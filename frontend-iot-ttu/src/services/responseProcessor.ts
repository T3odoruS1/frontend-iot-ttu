import {IApiResponse} from "./IApiResponse";
import {IErrorResponse} from "../dto/IErrorResponse";


export function processResponse<TEntity>(response: IApiResponse<TEntity, IErrorResponse>): Promise<TEntity> {
    if(response.data !== undefined || response.status?.toString().startsWith("2")){
        return Promise.resolve(response.data!);
    }
    if (response.status) {
        throw new Error(response.status?.toString())
    }
    if((response.errorData === undefined && response.status === undefined)) {
        throw new Error(Number(500).toString())
    }
    return Promise.resolve(response.data!);
}
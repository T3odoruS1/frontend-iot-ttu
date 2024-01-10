import {IApiResponse} from "./IApiResponse";
import {IErrorResponse} from "../dto/IErrorResponse";


export function processResponse<TEntity>(response: IApiResponse<TEntity, IErrorResponse>): Promise<TEntity> {
    if (response.errorData) {
        throw new Error(response.errorData.message)
    }if(
        response.status === undefined &&
        response.errorData === undefined
    ){
        throw new Error("SERVICE_UNAVAILABLE")
    }
    return Promise.resolve(response.data!);
}
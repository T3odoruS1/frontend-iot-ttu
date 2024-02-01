import {IApiResponse} from "./IApiResponse";
import {IErrorResponse} from "../dto/IErrorResponse";
import {throws} from "node:assert";


export function processResponse<TEntity>(response: IApiResponse<TEntity, IErrorResponse>): Promise<TEntity> {
    if(response.status?.toString() === "Unauthorized"){
        throw new Error("AUTH")
    }
    if((response.status === undefined &&
        response.errorData === undefined)) {
        throw new Error("SERVICE_UNAVAILABLE")
    }
    if (response.errorData) {
        throw new Error(response.errorData.message.toString())
    }

    return Promise.resolve(response.data!);
}
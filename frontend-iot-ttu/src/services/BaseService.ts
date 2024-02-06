import {IApiResponse} from "./IApiResponse";
import {IErrorResponse} from "../dto/IErrorResponse";
import {throws} from "node:assert";


export function processResponse<TEntity>(response: IApiResponse<TEntity, IErrorResponse>): Promise<TEntity> {
    console.log(response)

    if(response.data !== undefined){
        return Promise.resolve(response.data!);
    }

    // TODO merge this into the next if and test if it works
    if(response.errorData?.status === 401){
        throw new Error(Number(500).toString())
    }
    if (response.errorData?.status !== undefined && response.errorData !== undefined) {
        throw new Error(response.errorData.status.toString())
    }
    if((response.errorData === undefined)) {
        throw new Error(Number(500).toString())
    }
    return Promise.resolve(response.data!);
}
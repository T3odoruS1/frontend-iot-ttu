import {HttpStatusCode} from "axios";

export interface IApiResponse<T, F>{
    status: HttpStatusCode | undefined;
    data?: T;
    errorData?: F;
}
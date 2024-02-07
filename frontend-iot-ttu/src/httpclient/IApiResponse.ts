import {HttpStatusCode} from "axios";

export interface IApiResponse<T, F>{
    status: number | undefined;
    data?: T;
    errorData?: F;
}
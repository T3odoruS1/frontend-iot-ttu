import {AxiosError, AxiosInstance, AxiosResponse, HttpStatusCode} from "axios";
import {IApiResponse} from "./IApiResponse";
import {IJwtResponse} from "../dto/identity/IJwtResponse";

export class HttpTemplate<TOnSuccess, TOnFailure> {
    private axios: AxiosInstance;
    private method: HttpMethod;
    private url: string;
    private data?: {};
    private headers?: {};

    constructor(axios: AxiosInstance, method: HttpMethod, url: string, data?: {}, headers?: {}) {
        this.axios = axios;
        this.method = method;
        this.url = url;
        this.data = data;
        this.headers = headers;
    }


    withAuthentication() {
        const json = window.localStorage.getItem("jwt");
        if(json){
            const token: IJwtResponse = JSON.parse(json);
            this.headers = {
                ...this.headers,
                Authorization: "Bearer " + token.jwt,
            }
        }
        return this;
    }

    async send(): Promise<IApiResponse<TOnSuccess, TOnFailure>> {
        try {
            let result: AxiosResponse<TOnSuccess>;
            switch (this.method) {
                case HttpMethod.GET:
                    result = await this.axios.get<TOnSuccess>(this.url, { headers: this.headers });
                    break;
                case HttpMethod.POST:
                    result = await this.axios.post<TOnSuccess>(this.url, this.data, { headers: this.headers });
                    break;
                case HttpMethod.DELETE:
                    result = await this.axios.delete<TOnSuccess>(this.url, { headers: this.headers });
                    break;
                case HttpMethod.PUT:
                    result = await this.axios.put<TOnSuccess>(this.url, this.data, { headers: this.headers });
                    break;
                default:
                    throw new Error(`Unsupported method: ${this.method}`);
            }
            return {
                data: result.data,
                status: result.status
            } as IApiResponse<TOnSuccess, TOnFailure>;
        } catch (error) {
            const result = error as AxiosError;
            return {
                errorData: result?.response?.data as TOnFailure,
                status: result.response?.status || result.status
            }as IApiResponse<TOnSuccess, TOnFailure>;
        }
    }
}

export enum HttpMethod {
    POST = 'POST',
    GET = 'GET',
    DELETE = 'DELETE',
    PUT = 'PUT'
}
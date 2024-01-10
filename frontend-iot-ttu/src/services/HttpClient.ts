import {BaseClient} from "./BaseClient";
import {IApiResponse} from "./IApiResponse";
import {HttpMethod, HttpTemplate} from "./HttpTemplate";

export class HttpClient extends BaseClient {
    constructor(baseUrl: string) {
        super(baseUrl);
    }

    private async invoke<TEntity, TErrorData>(
        method: HttpMethod,
        url: string,
        data?: {},
        authenticate: boolean = false
    ): Promise<IApiResponse<TEntity, TErrorData>> {
        let request = new HttpTemplate<TEntity, TErrorData>(this.axios, method, url, data);
        if (authenticate) {
            request = request.withAuthentication();
        }
        return await request.send();
    }

    public async post<TEntity, TErrorData>(url: string, data: {}): Promise<IApiResponse<TEntity, TErrorData>> {
        return this.invoke<TEntity, TErrorData>(HttpMethod.POST, url, data);
    }

    public async postAuthenticated<TEntity, TErrorData>(url: string, data: {}): Promise<IApiResponse<TEntity, TErrorData>> {
        return this.invoke<TEntity, TErrorData>(HttpMethod.POST, url, data, true);
    }

    public async get<TEntity, TErrorData>(url: string): Promise<IApiResponse<TEntity, TErrorData>> {
        return this.invoke<TEntity, TErrorData>(HttpMethod.GET, url);
    }

    public async getAuthenticated<TEntity, TErrorData>(url: string): Promise<IApiResponse<TEntity, TErrorData>> {
        return this.invoke<TEntity, TErrorData>(HttpMethod.GET, url, undefined, true);
    }

    public async delete<TEntity, TErrorData>(url: string): Promise<IApiResponse<TEntity, TErrorData>> {
        return this.invoke<TEntity, TErrorData>(HttpMethod.DELETE, url);
    }

    public async deleteAuthenticated<TEntity, TErrorData>(url: string): Promise<IApiResponse<TEntity, TErrorData>> {
        return this.invoke<TEntity, TErrorData>(HttpMethod.DELETE, url, undefined, true);
    }


    public async put<TEntity, TErrorData>(url: string, data: {}): Promise<IApiResponse<TEntity, TErrorData>> {
        return this.invoke<TEntity, TErrorData>(HttpMethod.PUT, url, data);
    }


    public async putAuthenticated<TEntity, TErrorData>(url: string, data: {}): Promise<IApiResponse<TEntity, TErrorData>> {
        return this.invoke<TEntity, TErrorData>(HttpMethod.PUT, url, data, true);
    }

}
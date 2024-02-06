import {BaseClient} from "./BaseClient";
import {IApiResponse} from "./IApiResponse";
import {HttpMethod, HttpTemplate} from "./HttpTemplate";

export class HttpClient extends BaseClient {
    // private constructor(baseUrl: string) {
    //     super(baseUrl);
    // }
    //
    // private async invoke<TEntity, TErrorData>(
    //     method: HttpMethod,
    //     url: string,
    //     data?: {},
    //     authenticate: boolean = false
    // ): Promise<IApiResponse<TEntity, TErrorData>> {
    //     let request = new HttpTemplate<TEntity, TErrorData>(this.axios, method, url, data);
    //     if (authenticate) {
    //         request = request.withAuthentication();
    //     }
    //     return await request.send();
    // }
    //
    // protected async post<TEntity, TErrorData>(url: string, data: {}): Promise<IApiResponse<TEntity, TErrorData>> {
    //     return this.invoke<TEntity, TErrorData>(HttpMethod.POST, url, data);
    // }
    //
    // protected async postAuthenticated<TEntity, TErrorData>(url: string, data: {}): Promise<IApiResponse<TEntity, TErrorData>> {
    //     return this.invoke<TEntity, TErrorData>(HttpMethod.POST, url, data, true);
    // }
    //
    // protected async get<TEntity, TErrorData>(url: string): Promise<IApiResponse<TEntity, TErrorData>> {
    //     return this.invoke<TEntity, TErrorData>(HttpMethod.GET, url);
    // }
    //
    // protected async getAuthenticated<TEntity, TErrorData>(url: string): Promise<IApiResponse<TEntity, TErrorData>> {
    //     return this.invoke<TEntity, TErrorData>(HttpMethod.GET, url, undefined, true);
    // }
    //
    // protected async delete<TEntity, TErrorData>(url: string): Promise<IApiResponse<TEntity, TErrorData>> {
    //     return this.invoke<TEntity, TErrorData>(HttpMethod.DELETE, url);
    // }
    //
    // protected async deleteAuthenticated<TEntity, TErrorData>(url: string): Promise<IApiResponse<TEntity, TErrorData>> {
    //     return this.invoke<TEntity, TErrorData>(HttpMethod.DELETE, url, undefined, true);
    // }
    //
    //
    // protected async put<TEntity, TErrorData>(url: string, data: {}): Promise<IApiResponse<TEntity, TErrorData>> {
    //     return this.invoke<TEntity, TErrorData>(HttpMethod.PUT, url, data);
    // }
    //
    //
    // protected async putAuthenticated<TEntity, TErrorData>(url: string, data: {}): Promise<IApiResponse<TEntity, TErrorData>> {
    //     return this.invoke<TEntity, TErrorData>(HttpMethod.PUT, url, data, true);
    // }

}
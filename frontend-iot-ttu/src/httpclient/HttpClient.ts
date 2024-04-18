import Axios from "axios";
import {AxiosInstance} from "axios";
import {IJwtResponse} from "../dto/identity/IJwtResponse";
import {HttpMethod, HttpTemplate} from "./HttpTemplate";
import {IApiResponse} from "./IApiResponse";

export class HttpClient {

    private static baseUrl = window.__ENV__?.BASE_URL;

   
    protected axios!: AxiosInstance;

    private static instance: HttpClient | null = null;

    private cachedJwt: IJwtResponse | null = null;
    private lastUpdated: number | null = null;
    private refreshOperations = new Map<string, Promise<IJwtResponse>>();

    public instanceId: number  = 0;

    protected constructor(url?: string) {
        this.axios = Axios.create({
            baseURL: HttpClient.baseUrl + (url || ''),
            headers: {
                common: {
                    "Content-Type": "application/json",
                    "IOT-App": "1"
                },
            },
        });
        this.setupInterceptors();
        HttpClient.instance = this;
        HttpClient.instance.instanceId = Math.random();

        // Setup interceptors and other configurations
    }

    public static getInstance(url?: string): HttpClient {
        if (!HttpClient.instance) {
            HttpClient.instance = new HttpClient(url);
        }
        return HttpClient.instance;
    }




    private setupInterceptors(){

        this.axios.defaults.timeout = 15000;
        // On success => return request
        // On 401 refresh token and retry
        // On other fails => return request
        this.axios?.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                        const jsonToken = window.localStorage.getItem("jwt");
                        if(!jsonToken){
                            return Promise.reject({status: error.response.status});
                        }
                        const newToken = await this.refreshToken(JSON.parse(jsonToken));
                        if(newToken){
                            window.localStorage.setItem("jwt", JSON.stringify(newToken))
                        }
                        originalRequest.headers['Authorization'] = `Bearer ${newToken?.jwt}`;
                        return this.axios(originalRequest);
                    } catch (refreshError) {
                        // Handle failed refresh here (e.g., redirect to login)
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    async refreshToken(jwt: IJwtResponse): Promise<IJwtResponse | undefined> {
        const now = new Date().getTime();

        // If we have a cached result, and it's less than 10 seconds old, return it
        if (this.cachedJwt && this.lastUpdated !== null && now - this.lastUpdated < 10 * 1000) {
            return this.cachedJwt;
        }

        // If a refresh operation is already in progress for this jwt, return that promise
        if (this.refreshOperations.has(jwt.refreshToken)) {
            return this.refreshOperations.get(jwt.refreshToken);
        }

        // Start a new refresh operation
        const refreshPromise = this.axios.post<IJwtResponse>("/users/refreshToken", jwt)
            .then(response => {
                this.cachedJwt = response.data;
                this.lastUpdated = new Date().getTime();
                return response.data;
            }).finally(() => {
                // The operation is complete, remove the promise from the map
                this.refreshOperations.delete(jwt.refreshToken);
            });

        // Store the promise in the map
        this.refreshOperations.set(jwt.refreshToken, refreshPromise);

        return refreshPromise;
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

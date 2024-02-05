import Axios from "axios";
import {AxiosInstance} from "axios";
import {IJwtResponse} from "../dto/identity/IJwtResponse";

export abstract class BaseClient {
    private static baseUrl = "http://localhost:5180/api/v1";
    protected axios: AxiosInstance;

    private cachedJwt: IJwtResponse | null = null;
    private lastUpdated: number | null = null;
    private refreshOperations = new Map<string, Promise<IJwtResponse>>();

    constructor(url: string) {

        this.axios = Axios.create({
            baseURL: BaseClient.baseUrl + url,
            headers: {
                common: {
                    "Content-type": "application/json",
                },
            },
        });
        this.axios.interceptors.request.use(request => {
            console.log('Starting Request', JSON.stringify(request, null, 2))
            return request
        })
        this.axios.interceptors.response.use(function (response) {
            console.warn("Getting response", JSON.stringify(response, null, 2));
            return response;
        });


        // On success => return request
        // On 401 refresh token and retry
        // On other fails => return request
        this.axios.interceptors.response.use(
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

        // If we have a cached result, and it's less than 60 seconds old, return it
        if (this.cachedJwt && this.lastUpdated !== null && now - this.lastUpdated < 60 * 1000) {
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

}
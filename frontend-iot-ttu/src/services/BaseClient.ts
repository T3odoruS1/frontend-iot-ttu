import Axios  from "axios";
import { AxiosInstance } from "axios";

export abstract class BaseClient {
    private static baseUrl = "http://localhost:8000/api/";
    protected axios: AxiosInstance;

    constructor(url: string){

		this.axios = Axios.create({
			baseURL: BaseClient.baseUrl + url,
			headers: {
				common: {
					"Content-type": "application/json",
				},
			},
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
						const newToken = await this.refreshToken();
						originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
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

	async refreshToken(): Promise<any> {
	// Implement your refresh logic here
	// Make a request to your refresh token endpoint
	// Update and return the new token
	const response = await this.axios.post('/refresh-token-endpoint', { /* your data */ });
	const newToken = response.data.token;
	// Update the stored token in a secure place
	// ...
	return newToken;
}
}
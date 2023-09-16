import Axios  from "axios";
import { AxiosInstance } from "axios";

export abstract class BaseService{
    private static baseUrl = "http://localhost:8000/api/";
    protected axios: AxiosInstance;

    constructor(url: string){

		this.axios = Axios.create({
			baseURL: BaseService.baseUrl + url,
			headers: {
				common: {
					"Content-type": "application/json",
				},
			},
		});


		
		// this.axios.interceptors.request.use(request => {
        //     console.log('Starting Request', JSON.stringify(request, null, 2))
        //     return request
        // })
		// this.axios.interceptors.response.use(function (response) {
		// 	console.warn("Getting response", JSON.stringify(response, null, 2));
			
		// 	return response;
		//   }, function (error) {
		// 	console.warn("Getting response", JSON.stringify(error as Error, null, 2));
		// 	return error;
		//   });

	}
}
import {HttpClient} from "./HttpClient";
import {IJwtResponse} from "../dto/identity/IJwtResponse";
import {IRegister} from "../dto/identity/IRegister";
import {IErrorResponse} from "../dto/IErrorResponse";
import {processResponse} from "./BaseService";
import {ILogin} from "../dto/identity/ILogin";
import {IUser} from "../dto/identity/IUser";
import {IRole} from "../dto/identity/IRole";
import {IRoleUpdateResponse} from "../dto/identity/IRoleUpdateResponse";
import {IRoleUpdate} from "../dto/identity/IRoleUdate";
import {IUserDeactivate} from "../dto/identity/IUserDeactivate";
import {BaseClient} from "./BaseClient";

export class IdentityService{
    private client: BaseClient = BaseClient.getInstance();
    // constructor() {
    //     super("");
    // }



    async register(data: IRegister): Promise<IJwtResponse>{
        const response = await this.client.post<IJwtResponse, IErrorResponse>("/users/register", data);
        if(response.data?.jwt){
            this.saveToLocalStorage(response.data)
        }
        return processResponse<IJwtResponse>(response);
    }

    async login(data: ILogin): Promise<IJwtResponse> {
        const response = await this.client.post<IJwtResponse, IErrorResponse>("/users/login", data);
        if (response.data?.jwt) {
            this.saveToLocalStorage(response.data)
        }
        return processResponse<IJwtResponse>(response);
    }

    async logout(): Promise<void>{
        const data =window.localStorage.getItem("jwt")
        if(!data){
            return
        }
        let dto = {}
        if(data){
            dto = JSON.parse(data);
        }
        const response = await this.client.postAuthenticated<void, IErrorResponse>("/users/logout", dto);
        console.log(response.status)
        window.localStorage.removeItem("jwt")
        return Promise.resolve(response.data);
    }

    async getUsers(): Promise<IUser[]>{
        const response = await this.client.getAuthenticated<IUser[], IErrorResponse>("/users");
        console.log("Users have been fetched")
        return processResponse<IUser[]>(response);
    }

    async getRoles(): Promise<IRole[]>{
        const response = await this.client.getAuthenticated<IRole[], IErrorResponse>("/users/roles");
        console.log("Roles have been fetched")
        return processResponse<IRole[]>(response);
    }

    async updateUserRole(data: IRoleUpdate): Promise<IRoleUpdateResponse>{
        const response =
            await this.client.postAuthenticated<IRoleUpdateResponse, IErrorResponse>("/role", data);
        return processResponse<IRoleUpdateResponse>(response);
    }

    async deactivateUser(data: IUserDeactivate): Promise<void>{
        const response = await this.client.postAuthenticated<void, IErrorResponse>("/users/lock", data)
        return processResponse<void>(response);
    }

    private saveToLocalStorage(jwtPromise: IJwtResponse) {
        window.localStorage.setItem("jwt", JSON.stringify(jwtPromise));
    }
}
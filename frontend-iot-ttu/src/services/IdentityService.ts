import {BaseClient} from "./BaseClient";
import {HttpClient} from "./HttpClient";
import {IJwtResponse} from "../dto/identity/IJwtResponse";
import {IRegister} from "../dto/identity/IRegister";
import {IErrorResponse} from "../dto/IErrorResponse";
import {processResponse} from "./BaseService";
import {ILogin} from "../dto/identity/ILogin";
import {ILogout} from "../dto/identity/ILogout";
import {IUser} from "../dto/identity/IUser";
import {IRole} from "../dto/identity/IRole";
import {IRoleUpdateResponse} from "../dto/identity/IRoleUpdateResponse";
import {IRoleUpdate} from "../dto/identity/IRoleUdate";
import {IUserDeactivate} from "../dto/identity/IUserDeactivate";

export class IdentityService extends HttpClient{
    constructor() {
        super("");
    }


    async register(data: IRegister): Promise<IJwtResponse>{
        const response = await this.post<IJwtResponse, IErrorResponse>("users/register", data);
        if(response.data?.jwt){
            console.log("Saved!")
            this.saveToLocalStorage(response.data)
        }
        return processResponse<IJwtResponse>(response);
    }

    async login(data: ILogin): Promise<IJwtResponse> {
        const response = await this.post<IJwtResponse, IErrorResponse>("users/login", data);
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
        const response = await this.postAuthenticated<void, IErrorResponse>("users/logout", dto);
        console.log(response.status)
        window.localStorage.removeItem("jwt")
        return Promise.resolve(response.data);
    }

    async getUsers(): Promise<IUser[]>{
        const response = await this.getAuthenticated<IUser[], IErrorResponse>("users");
        return processResponse<IUser[]>(response);
    }

    async getAllRoles(): Promise<IRole[]>{
        const response = await this.getAuthenticated<IRole[], IErrorResponse>("users/roles");
        return processResponse<IRole[]>(response);
    }

    async updateUserRole(data: IRoleUpdate): Promise<IRoleUpdateResponse>{
        const response =
            await this.postAuthenticated<IRoleUpdateResponse, IErrorResponse>("users/role", data);
        return processResponse<IRoleUpdateResponse>(response);
    }

    async deactivateUser(data: IUserDeactivate): Promise<void>{
        const response = await this.postAuthenticated<void, IErrorResponse>("users/lock", data)
        return processResponse<void>(response);
    }

    private saveToLocalStorage(jwtPromise: IJwtResponse) {
        window.localStorage.setItem("jwt", JSON.stringify(jwtPromise));
    }
}
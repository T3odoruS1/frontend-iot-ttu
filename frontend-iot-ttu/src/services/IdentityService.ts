import {IJwtResponse} from "../dto/identity/IJwtResponse";
import {IRegister} from "../dto/identity/IRegister";
import {IErrorResponse} from "../dto/IErrorResponse";
import {processResponse} from "../httpclient/responseProcessor";
import {ILogin} from "../dto/identity/ILogin";
import {IUser} from "../dto/identity/IUser";
import {IRole} from "../dto/identity/IRole";
import {IRoleUpdateResponse} from "../dto/identity/IRoleUpdateResponse";
import {IRoleUpdate} from "../dto/identity/IRoleUdate";
import {IUserDeactivate} from "../dto/identity/IUserDeactivate";
import {HttpClient} from "../httpclient/HttpClient";
import {IChangePassword} from "../dto/identity/IChangePassword";

export class IdentityService{
    private client: HttpClient = HttpClient.getInstance();

    register = async (data: IRegister): Promise<IJwtResponse> => {
        const response = await this.client.post<IJwtResponse, IErrorResponse>("/users/register", data);
        if(response.data?.jwt){
            this.saveToLocalStorage(response.data)
        }
        return processResponse<IJwtResponse>(response);
    }

    login = async (data: ILogin): Promise<IJwtResponse> => {
        const response = await this.client.post<IJwtResponse, IErrorResponse>("/users/login", data);
        if (response.data?.jwt) {
            this.saveToLocalStorage(response.data)
        }
        return processResponse<IJwtResponse>(response);
    }

    logout = async (): Promise<void> => {
        const data =window.localStorage.getItem("jwt")
        if(!data){
            return
        }
        let dto = {}
        if(data){
            dto = JSON.parse(data);
        }
        const response = await this.client.postAuthenticated<void, IErrorResponse>("/users/logout", dto);
        window.localStorage.removeItem("jwt")
        return Promise.resolve(response.data);
    }

     getUsers = async (): Promise<IUser[]> => {
        const response = await this.client.getAuthenticated<IUser[], IErrorResponse>("/users");
        return processResponse<IUser[]>(response);
    }

    getRoles = async (): Promise<IRole[]> => {
        const response = await this.client.getAuthenticated<IRole[], IErrorResponse>("/users/roles");
        return processResponse<IRole[]>(response);
    }

    updateUserRole = async (data: IRoleUpdate): Promise<IRoleUpdateResponse> => {
        const response =
            await this.client.postAuthenticated<IRoleUpdateResponse, IErrorResponse>("/users/role", data);
        return processResponse<IRoleUpdateResponse>(response);
    }

    deactivateUser = async (data: IUserDeactivate): Promise<void> => {
        const response = await this.client.postAuthenticated<void, IErrorResponse>("/users/delete", data)
        return processResponse<void>(response);
    }

    blindRegister = async (data: IRegister, lang: string) : Promise<void> => {
        const response =
            await this.client.post<void, IErrorResponse>(`/users/${lang}/registerUnknown`, data);
        return processResponse<void>(response);
    }

    changePassword = async (data: IChangePassword): Promise<IJwtResponse> => {
        const response = await this.client.postAuthenticated<IJwtResponse, IErrorResponse>("/users/changePassword", data);
        if (response.data?.jwt) {
            this.saveToLocalStorage(response.data)
        }
        return processResponse<IJwtResponse>(response);
    }

    resetPassword = async (data: {userId: string}): Promise<void> => {
        const response = await this.client.postAuthenticated<void, IErrorResponse>("/users/resetPassword", data);
        return processResponse<void>(response);
    }

    saveToLocalStorage = async (jwtPromise: IJwtResponse)=>{
        window.localStorage.setItem("jwt", JSON.stringify(jwtPromise));
    }
}
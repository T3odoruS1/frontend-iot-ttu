import {HttpClient} from "../httpclient/HttpClient";
import {IEmailRecepientOutput} from "../dto/recepient/IEmailRecepientOutput";
import {IEmailRecepient} from "../dto/recepient/IEmailRecepient";
import {processResponse} from "../httpclient/responseProcessor";
import {IErrorResponse} from "../dto/IErrorResponse";

export class EmailRecepientService{
    private client: HttpClient = HttpClient.getInstance();

    create = async (data: IEmailRecepientOutput): Promise<IEmailRecepient> => {
        return processResponse<IEmailRecepient>(
            await this.client.postAuthenticated<IEmailRecepient, IErrorResponse>("/EmailRecipents", data)
        )
    }

    getAll = async (): Promise<IEmailRecepient[]> => {
        return processResponse<IEmailRecepient[]>(
            await this.client.get<IEmailRecepient[], IErrorResponse>("/EmailRecipents/all")
        )
    }

    delete = async (id: string): Promise<void> => {
        return processResponse<void>(
            await this.client.deleteAuthenticated<void, IErrorResponse>(`/EmailRecipents/${id}`)
        )
    }
}
import {IContactDto} from "../dto/contact/IContactDto";
import {IErrorResponse} from "../dto/IErrorResponse";
import {IContactResponse} from "../dto/contact/IContactResponse";
import {processResponse} from "./responseProcessor";
import {HttpClient} from "./HttpClient";

export class MailService {
    private client: HttpClient = HttpClient.getInstance();
    contact = async (data: IContactDto): Promise<IContactResponse> => {
        const result = await this.client.post<IContactResponse, IErrorResponse>(`et/mail/contact`, data);
        return processResponse<IContactResponse>(result);
    }
}
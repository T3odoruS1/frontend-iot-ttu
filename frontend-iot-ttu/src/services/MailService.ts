import {IContactDto} from "../dto/contact/IContactDto";
import {IErrorResponse} from "../dto/IErrorResponse";
import {HttpClient} from "./HttpClient";
import {IContactResponse} from "../dto/contact/IContactResponse";
import {processResponse} from "./BaseService";
import {BaseClient} from "./BaseClient";

export class MailService extends BaseClient {
    constructor() {
        super("");
    }

    contact = async (data: IContactDto): Promise<IContactResponse> => {
        const result = await this.post<IContactResponse, IErrorResponse>(`et/mail/contact`, data);
        return processResponse<IContactResponse>(result);
    }
}
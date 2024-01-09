import {BaseEntityService} from "./BaseEntityService";
import {IContactDto} from "../dto/contact/IContactDto";
import {IErrorResponse} from "../dto/IErrorResponse";

export class MailService extends BaseEntityService {
    constructor() {
        super("");
    }

    contact = async (data: IContactDto): Promise<IErrorResponse | void> => {
        return await this.post<IErrorResponse | void>(`et/mail/contact`, data);
    }
}
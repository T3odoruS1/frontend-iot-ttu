import {HttpClient} from "../httpclient/HttpClient";
import {IContactPersonOutput} from "../dto/contact/people/IContactPersonOutput";
import {IContactPersonMultilang} from "../dto/contact/people/IContactPersonMultilang";
import {processResponse} from "../httpclient/responseProcessor";
import {IErrorResponse} from "../dto/IErrorResponse";
import {IContactPerson} from "../dto/contact/people/IContactPerson";

export class ContactPersonService{

    private client: HttpClient = HttpClient.getInstance();

    create = async (data: IContactPersonOutput): Promise<IContactPersonMultilang> => {
        return processResponse<IContactPersonMultilang>(
            await this.client.postAuthenticated<IContactPersonMultilang, IErrorResponse>("/contactPerson", data))
    }

    getPreview =  async (id: string):Promise<IContactPersonMultilang> => {
        return processResponse<IContactPersonMultilang>(
            await this.client.get(`/contactPerson/preview/${id}`)
        )
    }

    getById = async (lang: string, id: string): Promise<IContactPerson> => {
        const result = await this.client.get<IContactPerson, IErrorResponse>(`/contactPerson/${lang}/${id}`);
        return processResponse<IContactPerson>(result);
    }

    getAll = async (lang: string): Promise<IContactPerson[]> => {
        const result = await this.client.get<IContactPerson[], IErrorResponse>(`/contactPerson/${lang}`);
        return processResponse<IContactPerson[]>(result);
    }

    delete = async (id: string): Promise<void> => {
        return processResponse<void>(await this.client.deleteAuthenticated<void, IErrorResponse>(`/contactPerson/${id}`));
    }

}
import {HttpClient} from "../httpclient/HttpClient";
import {IPartnerImageOutput} from "../dto/partnerImage/IPartnerImageOutput";
import {IPartnerImage} from "../dto/partnerImage/IPartnerImage";
import {processResponse} from "../httpclient/responseProcessor";
import {IErrorResponse} from "../dto/IErrorResponse";

export class PartnerImageService{
    private client: HttpClient = HttpClient.getInstance();

    create = async (data: IPartnerImageOutput): Promise<IPartnerImage> => {
        return processResponse<IPartnerImage>(
            await this.client.postAuthenticated<IPartnerImage, IErrorResponse>(`/PartnerImage`, data)
        );
    }

    getAll = async (): Promise<IPartnerImage[]> => {
        return processResponse<IPartnerImage[]>(
            await this.client.get<IPartnerImage[], IErrorResponse>(`/PartnerImage`)
        );
    }

    delete = async (id: string): Promise<void> => {
        return processResponse<void>(
            await this.client.deleteAuthenticated<void, IErrorResponse>(`/PartnerImage/${id}`)
        );
    }
}
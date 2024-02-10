import {HttpClient} from "../httpclient/HttpClient";
import {processResponse} from "../httpclient/responseProcessor";
import {IErrorResponse} from "../dto/IErrorResponse";

export class LivelinessService{
    private client: HttpClient = HttpClient.getInstance();

    liveliness = async (): Promise<void> => {
        return processResponse<void>(await this.client.get<void, IErrorResponse>("/ping"));
    }
}
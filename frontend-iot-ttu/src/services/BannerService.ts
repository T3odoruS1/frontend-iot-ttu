import {HttpClient} from "../httpclient/HttpClient";
import {IBannerOutput} from "../dto/banner/IBannerOutput";
import {IBannerMultilang} from "../dto/banner/IBannerMultilang";
import {processResponse} from "../httpclient/responseProcessor";
import {IBanner} from "../dto/banner/IBanner";
import {IErrorResponse} from "../dto/IErrorResponse";
import {IBannerSequenceUpdate} from "../dto/banner/IBannerSequenceUpdate";

export class BannerService {
    private client: HttpClient = HttpClient.getInstance();

    create = async (data: IBannerOutput): Promise<IBannerMultilang> => {
        return processResponse<IBannerMultilang>(
            await this.client.postAuthenticated<IBannerMultilang, IErrorResponse>(`/HomePageBanner`, data));
    }

    getAll = async (lang: string): Promise<IBanner[]> => {
        return processResponse<IBanner[]>(
            await this.client.get<IBanner[], IErrorResponse>(`/HomePageBanner/${lang}`));
    }

    update = async (data: IBannerOutput): Promise<IBannerMultilang> => {
        return processResponse<IBannerMultilang>(
            await this.client.putAuthenticated<IBannerMultilang, IErrorResponse>(`/HomePageBanner`, data)
        )
    }

    /*
    List of all banners multilang
     */
    getPreview = async (): Promise<IBannerMultilang[]> => {
        return processResponse<IBannerMultilang[]>(
            await this.client.get<IBannerMultilang[], IErrorResponse>(`/HomePageBanner`)
        )
    }

    getMultilangById = async (id: string): Promise<IBannerMultilang> => {
        return processResponse<IBannerMultilang>(
            await this.client.get<IBannerMultilang, IErrorResponse>(`/HomePageBanner/${id}`)
        )
    }

    delete = async (id: string): Promise<void> => {
        return processResponse<void>(
            await this.client.deleteAuthenticated<void, IErrorResponse>(`/HomePageBanner/${id}`)
        );
    }

    bulkUpdate = async (data: IBannerSequenceUpdate[]): Promise<void> => {
        return processResponse<void>(
            await this.client.putAuthenticated<void, IErrorResponse>(`/homePageBanner/bulk/sequence`, data)
        );
    }

}
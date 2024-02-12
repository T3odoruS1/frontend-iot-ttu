import { IErrorResponse } from "../dto/IErrorResponse";
import { IFeedPageCategory } from "../dto/feedpage/category/IFeedPageCategory";
import { IFeedPageCategoryOutput } from "../dto/feedpage/category/IFeedPageCategoryOutput";
import { IFeedPage } from "../dto/feedpage/page/IFeedPage";
import { IFeedPagePostMultilang } from "../dto/feedpage/post/IFeedPagePostMultilang";
import { IFeedPagePostOutput } from "../dto/feedpage/post/IFeedPagePostOutput";
import { HttpClient } from "../httpclient/HttpClient";
import { processResponse } from "../httpclient/responseProcessor";

export class FeedService {
    private client: HttpClient = HttpClient.getInstance();


    // Pages

    getPage = async (lang: string, identifier: string): Promise<IFeedPage> => {
        return processResponse<IFeedPage>(
            await this.client.get<IFeedPage, IErrorResponse>(`/FeedPage/${lang}/${identifier}`)
        );
    }


    // Categories

    getCategory = async (lang: string, id: string): Promise<IFeedPageCategory> => {
        return processResponse<IFeedPageCategory>(
            await this.client.get<IFeedPageCategory, IErrorResponse>(`/FeedPageCategory/${lang}/${id}`)
        );
    }

    getCategories = async (lang: string, pageIdentifier: string): Promise<IFeedPageCategory[]> => {
        return processResponse<IFeedPageCategory[]>(
            await this.client.get<IFeedPageCategory[], IErrorResponse>(`/FeedPageCategory/${lang}/${pageIdentifier}`)
        )
    }

    deleteCategory = async (id: string): Promise<void> => {
        return processResponse<void>(
            await this.client.deleteAuthenticated<void, IErrorResponse>(`/FeedPageCategory/${id}`)
        );
    }

    createCategory = async (data: IFeedPageCategoryOutput): Promise<IFeedPageCategoryOutput> => {
        return processResponse<IFeedPageCategoryOutput>(
            await this.client.postAuthenticated<IFeedPageCategoryOutput, IErrorResponse>(`/FeedPageCategory`, data)
        );
    }

    updateCategory = async (data: IFeedPageCategoryOutput): Promise<IFeedPageCategoryOutput> => {
        return processResponse<IFeedPageCategoryOutput>(
            await this.client.putAuthenticated<IFeedPageCategoryOutput, IErrorResponse>(`/FeedPageCategory`, data)
        );
    }



    // Posts
    getPostMultilang = async (id: string): Promise<IFeedPagePostMultilang> => {
        return processResponse<IFeedPagePostMultilang>(
            await this.client.get<IFeedPagePostMultilang, IErrorResponse>(`/FeedPagePost/${id}`)
        );
    }

    deletePost = async (id: string): Promise<void> => {
        return processResponse<void>(
            await this.client.deleteAuthenticated<void, IErrorResponse>(`/FeedPagePost/${id}`)
        );
    }

    createPost = async (data: IFeedPagePostOutput): Promise<IFeedPagePostMultilang> => {
        return processResponse<IFeedPagePostMultilang>(
            await this.client.postAuthenticated<IFeedPagePostMultilang, IErrorResponse>(`/FeedPagePost`, data)
        );
    }


    updatePost = async (data: IFeedPagePostOutput): Promise<IFeedPagePostMultilang> => {
        return processResponse<IFeedPagePostMultilang>(
            await this.client.putAuthenticated<IFeedPagePostMultilang, IErrorResponse>(`/FeedPagePost`, data)
        );
    }

}
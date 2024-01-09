import {useEffect, useState} from "react";
import {NewsService} from "../services/NewsService";
import {INewsWTranslations} from "../dto/news/INewsWTranslations";

const useUpdatableNews = () => {
    const [pending, setPending] = useState(true);
    const newsService = new NewsService();
    const [news, setNews] =
        useState<INewsWTranslations | null>(null);
    const update = newsService.update;

    const fetch= async (id: string) => {
        await newsService.getMultiLang(id).then((res) => {
            if(res !== undefined && "title" in res){
                setNews(res)
                setPending(false);
            }
        });
    }

    return {news, pending, update, fetch}

}


export default useUpdatableNews;
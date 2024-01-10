import {useEffect, useState} from "react";
import {NewsService} from "../services/NewsService";
import {INewsWTranslations} from "../dto/news/INewsWTranslations";

const useUpdatableNews = () => {
    const [pending, setPending] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const newsService = new NewsService();
    const [news, setNews] =
        useState<INewsWTranslations | null>(null);
    const update = newsService.update;

    const fetch = async (id: string) => {
        newsService.getMultiLang(id)
            .then((res) => setNews(res))
            .catch(error => setError(error))
            .finally(() => setPending(false));
    }
    return {news, pending, update, fetch, error}
}


export default useUpdatableNews;
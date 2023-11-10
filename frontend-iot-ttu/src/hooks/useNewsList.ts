import {NewsService} from "../services/NewsService";
import {useEffect, useState} from "react";
import {INews} from "../dto/news/INews";
import {useTranslation} from "react-i18next";



const useNewsList = () => {
    const [t, i18n] = useTranslation();
    const newsService = new NewsService();
    const [news, setNews] = useState<INews[]>([]);
    const [pending, setPending] = useState(true);
    const remove = newsService.remove;
    const fetch = async () => {
        await newsService.getAll(i18n.language).then((result) => {
            if (result !== undefined) {
                setNews(result);
                setPending(false);
            }
        });
    }

    useEffect(() => {
        fetch();
        return () => {
            setNews([]);
            setPending(true);
        }
    }, [i18n.language]);

    return {news, setNews, pending, remove}
}

export default useNewsList;
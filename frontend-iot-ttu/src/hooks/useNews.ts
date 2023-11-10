import {useEffect, useState} from "react";
import {INews} from "../dto/news/INews";
import {NewsService} from "../services/NewsService";
import i18n from 'i18next';

const useNews = (id: string) => {
    const [newsPiece, setNewsPiece] = useState<INews | null>(null);
    const [pending, setPending] = useState(true);
    const newsService = new NewsService();
    const fetch = () => {
        newsService.getById(i18n.language, id).then((result) => {
            if (result !== undefined) {
                setNewsPiece(result);
            }
            setPending(false);
        })
    }
    useEffect(() => {
        fetch();
    }, [id, i18n.language]);

    return {newsPiece, pending}
}

export default useNews;

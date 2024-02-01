import {useEffect, useState} from "react";
import {INews} from "../dto/news/INews";
import {NewsService} from "../services/NewsService";
import i18n from 'i18next';

const useNews = (id: string) => {

    const [newsPiece, setNewsPiece] = useState<INews | null>(null);
    const [pending, setPending] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const newsService = new NewsService();
    const fetch = () => {
        newsService.getById(i18n.language, id)
            .then(setNewsPiece)
            .catch(e => setError(e.message))
            .finally(() => setPending(false))
    }
    useEffect(() => {
        fetch();
        console.log(error)
    }, [id, i18n.language]);

    return {newsPiece, pending, error}
}

export default useNews;

import {NewsService} from "../services/NewsService";
import {useEffect, useState} from "react";

const useNewsCount = () => {
    const newsService = new NewsService();
    const [count, setCount] = useState(0);
    const [pending, setPending] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const fetch = () => {
        newsService.getCount()
            .then(setCount)
            .catch(e => setError(e.message))
            .finally(() => setPending(false))
    }

    useEffect(() => {
        fetch();
        return () => {
            setCount(0)
            setPending(true);
        }
    }, []);

    return {count, pending, error}
}

export default useNewsCount;
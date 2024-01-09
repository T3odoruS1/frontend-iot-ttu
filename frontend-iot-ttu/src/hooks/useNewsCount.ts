import {NewsService} from "../services/NewsService";
import {useEffect, useState} from "react";

const useNewsCount = () => {
    const newsService = new NewsService();
    const [count, setCount] = useState(0);
    const [pending, setPending] = useState(true);

    const fetch = () => {
        newsService.getCount().then(result => {
            if(result !== undefined){
                setCount(result);
                setPending(false);
            }
        })
    }

    useEffect(() => {
        fetch();
        return () => {
            setCount(0)
            setPending(true);
        }
    }, []);

    return {count, pending}
}

export default useNewsCount;
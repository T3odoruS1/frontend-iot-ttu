import { useState, useEffect } from 'react';
/*
Generic hook for fetching data.
For pagination use usePaginatedFetch hook.
Usage:

const {data: news, pending, error} = useFetch<INews>(newsService.getById, [i18n.language, id ?? ""])

args should be passed in the correct order. When using check service function signature not to make a mistake.
 */


type serviceFunction<TEntity> = (...args: any[]) => Promise<TEntity>;

const useFetch = <TEntity>(callback: serviceFunction<TEntity>, args: any[] = []) => {
    const [pending, setPending] = useState(true);
    const [data, setData] = useState<TEntity | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchData = () => {
        setPending(true);
        setError(null);
        callback(...args)
            .then(response => {
                setData(response);
            })
            .catch(e => {
                setError(e.message)
            })
            .finally(() => {setPending(false)});
    };

    useEffect(() => {


        fetchData();

    }, [...args]);

    // Return your state variables and potentially other controls as needed
    return { data, setData, error, pending, fetchData };
}


export default useFetch
import {IPaginatedService} from "../services/IPaginatedService";
import {IBaseEntity} from "../dto/IBaseEntity";
import {useEffect, useMemo, useState} from "react";
import i18n from "i18next";


const usePaginatedFetch =
    <TEntity extends IBaseEntity, TService extends IPaginatedService<TEntity>>(
        service: TService,
        page: number = 0,
        size: number = 100,
    ) => {

        const [pending, setPending] = useState(true);
        const [data, setData] = useState<TEntity[]>([]);
        const [total, setTotal] = useState(0);
        const [error, setError] = useState<string | null>(null);

        const pageCount = useMemo(() => {
            return Math.ceil(total / size);
        }, [size, total]);

        const fetchTotal = () => {
            service.getCount()
                .then(setTotal)
                .catch(e => setError(e.message));

        }

        const getData = () => {
            if(i18n.language !== undefined){
                service.getAll(i18n.language, page, size)
                    .then(setData)
                    .catch(e => setError(e.message))
                    .finally(() => setPending(false));
            }
        }


        useEffect(() => {
            fetchTotal();
            getData();
        }, [page, size, i18n.language]);

        return {data, pending, total, pageCount, error}
    }

export default usePaginatedFetch;
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

        const pageCount = useMemo(() => {
            return Math.ceil(total / size);
        }, [size, total]);

        const fetchTotal = () => {
            service.getCount().then(response => {
                if (response !== undefined) {
                    setTotal(response);
                }
            });

        }

        const getData = () => {
            if(i18n.language !== undefined){
                service.getAll(i18n.language, page, size).then(response => {
                    if (response !== undefined) {
                        setData(response);
                        setPending(false);
                    }
                })
            }
        }


        useEffect(() => {
            fetchTotal();
            getData();
            return () => {
                setData([]);
                setPending(true);
            }
        }, [page, size, i18n.language]);

        return {data, pending, total, pageCount}
    }

export default usePaginatedFetch;
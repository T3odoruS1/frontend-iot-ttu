import {useEffect, useState} from "react";
import {IPageContentMultilang} from "../dto/pageContent/IPageContentMultilang";
import {PageContentService} from "../services/PageContentService";

const useTranslatedPageContent = (pageIdentifier: string) => {
    const [pageContent, setPageContent] =
        useState<IPageContentMultilang| null>(null)
    const [pending, setPending] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const service = new PageContentService();

    const fetch = () => {
        service.getMultilang(pageIdentifier)
            .then(setPageContent)
            .catch(e => setError(e.message))
            .finally(() => {setPending(false)});
    }

    useEffect(() => {
        fetch();
    }, [pageIdentifier])
    return {pageContent, pending, error, service}
}

export default useTranslatedPageContent;
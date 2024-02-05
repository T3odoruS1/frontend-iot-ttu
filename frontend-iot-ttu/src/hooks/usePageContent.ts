import {useEffect, useState} from "react";
import {IPageContentMultilang} from "../dto/pageContent/IPageContentMultilang";
import {PageContentService} from "../services/PageContentService";
import {IPageContent} from "../dto/pageContent/IPageContent";
import i18n from "i18next";

const usePageContent = (pageIdentifier: string) => {
    const [pageContent, setPageContent] =
        useState<IPageContent| null>(null)
    const [pending, setPending] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const service = new PageContentService();

    const fetch = () => {
        service.getContent(pageIdentifier, i18n.language)
            .then(setPageContent)
            .catch(e => setError(e.message))
            .finally(() => {setPending(false)});
    }

    useEffect(() => {
        fetch();
    }, [pageIdentifier, i18n.language])
    return {pageContent, pending, error, service}
}

export default usePageContent;
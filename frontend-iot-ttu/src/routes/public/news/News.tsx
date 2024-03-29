import {Outlet} from "react-router-dom";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import {useTranslation} from "react-i18next";

const News = () => {
    const {t} = useTranslation();
    useDocumentTitle(t("titles.news"));
    return <>
        <Outlet/></>;
}

export default News;
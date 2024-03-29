import { EFeedPage } from "../../../dto/feedpage/EFeedPage";
import FeedPage from "../feedPage/FeedPage";
import PageTitle from "../../../components/common/PageTitle";
import {useTranslation} from "react-i18next";
import useDocumentTitle from "../../../hooks/useDocumentTitle";

const Research = () => {
    const {t} = useTranslation();
    useDocumentTitle(t("titles.research"))
    return <>
        <PageTitle>Research topics</PageTitle>
        <FeedPage pageIdentifier={EFeedPage.RESEARCH} />
    </>
}

export default Research;
import { EFeedPage } from "../../../dto/feedpage/EFeedPage";
import FeedPage from "../feedPage/FeedPage";
import PageTitle from "../../../components/common/PageTitle";
import {useTranslation} from "react-i18next";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LayoutMulticolour from "../../../components/structure/LayoutMulticolour";

const Research = () => {
    const {t} = useTranslation();
    useDocumentTitle(t("titles.research"))
    return <LayoutMulticolour bodyContent={<FeedPage pageIdentifier={EFeedPage.RESEARCH} />} headerContent={ <PageTitle>Research topics</PageTitle>}/>



}

export default Research;
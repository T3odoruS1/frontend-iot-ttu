import { EFeedPage } from "../../../dto/feedpage/EFeedPage";
import FeedPage from "../feedPage/FeedPage";
import PageTitle from "../../../components/common/PageTitle";
import {useTranslation} from "react-i18next";
import useDocumentTitle from "../../../hooks/useDocumentTitle";

const Hardware = () => {
    const {t} = useTranslation();
    useDocumentTitle(t("titles.hardware"))
    return <>
        <PageTitle>Available hardware</PageTitle>
        <FeedPage pageIdentifier={EFeedPage.HARDWARE}/>
    </>
}

export default Hardware;
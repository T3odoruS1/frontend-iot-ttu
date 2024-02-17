import { EFeedPage } from "../../../dto/feedpage/EFeedPage";
import FeedPage from "../feedPage/FeedPage";
import PageTitle from "../../../components/common/PageTitle";

const Hardware = () => {
    return <>
        <PageTitle>Available hardware</PageTitle>
        <FeedPage pageIdentifier={EFeedPage.HARDWARE}/>
    </>
}

export default Hardware;
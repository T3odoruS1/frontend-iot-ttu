import { EFeedPage } from "../../../dto/feedpage/EFeedPage";
import FeedPage from "../feedPage/FeedPage";
import PageTitle from "../../../components/common/PageTitle";

const Research = () => {
    return <>
        <PageTitle>Research topics</PageTitle>
        <FeedPage pageIdentifier={EFeedPage.RESEARCH} />
    </>
}

export default Research;
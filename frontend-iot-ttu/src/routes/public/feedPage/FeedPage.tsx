import { FC } from "react";
import useFetch from "../../../hooks/useFetch";
import {IFeedPage} from "../../../dto/feedpage/page/IFeedPage";
import {FeedService} from "../../../services/FeedService";
import {Loader} from "../../../components/Loader";
import Collapse from "../../../components/Collapse";
import FeedPagePostElement from "../../admin/feedpage/post/FeedPagePostElement";
import {useTranslation} from "react-i18next";

interface IProps{
    pageIdentifier: string;
}

const FeedPage: FC<IProps> = ({pageIdentifier}) => {
    const {i18n} = useTranslation();
    const service = new FeedService();
    const {data, pending, error} =
        useFetch<IFeedPage>(service.getPage, [i18n.language, pageIdentifier])

    return <>{(pending) && <Loader />}

        {data?.feedPageCategories.map((category) => {
            if(category.feedPageCategoryPost.length === 0){
                return <></>
            }
            return <Collapse isActive={true} title={category.title} children={<div>

                {category.feedPageCategoryPost.map(post => {
                    return <div className={"mt-4"}><FeedPagePostElement
                        feedPageCategoryId={""}
                        title={post.title}
                        body={post.body}
                        createdAt={post.createdAt}
                        id={""} /></div>
                })}

            </div>} />
        })}</>
}

export default FeedPage;
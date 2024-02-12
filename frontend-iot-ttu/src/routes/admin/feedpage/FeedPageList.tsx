import { FormFloating, FormSelect } from "react-bootstrap";
import PageTitle from "../../../components/common/PageTitle";
import { EFeedPage } from "../../../dto/feedpage/EFeedPage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonSmaller from "../../../components/common/ButtonSmaller";
import { IFeedPage } from "../../../dto/feedpage/page/IFeedPage";
import useFetch from "../../../hooks/useFetch";
import { FeedService } from "../../../services/FeedService";
import i18n from "i18next";
import SubHeadingPurple from "../../../components/common/SubheadingPurple";
import FeedPagePostElement from "./post/FeedPagePostElement";

// Page selected using dropdown. Posts are hidden under categories, expandable.

const FeedPageList = () => {

    const [page, setPage] = useState(EFeedPage.HARDWARE.toString());
    const navigate = useNavigate();
    const onPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("Event target: ", event.target.value);
        setPage(event.target.value);
    }

    const service = new FeedService();
    const {data, error, pending} = useFetch<IFeedPage>(service.getPage, [i18n.language, page]);


    const toCreateCategory = () => {
        navigate("./createCategory")
    }

    const toCreatePost = () => {
        navigate("./createPost")
    }

    useEffect(() => {

    }, [page]);

    return <>
        <PageTitle>Feed pages</PageTitle>
        <ButtonSmaller onClick={toCreateCategory} className="m-2">Create category</ButtonSmaller>
        <ButtonSmaller onClick={toCreatePost} className="m-2">Create post</ButtonSmaller>
        <FormFloating>
            <FormSelect value={page} onChange={onPageChange}>
                <option value={EFeedPage.HARDWARE}>{EFeedPage.HARDWARE}</option>
                <option value={EFeedPage.RESEARCH}>{EFeedPage.RESEARCH}</option>
            </FormSelect>
        </FormFloating>

        {data?.feedPageCategories?.map(category => {
            return <div>
                <SubHeadingPurple>{category.title}</SubHeadingPurple>
                {category?.feedPageCategoryPost?.map(post => {
                    return <FeedPagePostElement 
                    feedPageCategoryId={""} 
                    title={post.title} 
                    body={post.body} 
                    createdAt={post.createdAt} 
                    id={""}/>
                })}
            </div>
        })}
    </>
}

export default FeedPageList;
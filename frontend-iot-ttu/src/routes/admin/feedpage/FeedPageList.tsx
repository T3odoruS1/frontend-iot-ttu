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
import FeedPagePostElement from "./post/FeedPagePostElement";
import { Loader } from "../../../components/Loader";
import Collapse from "../../../components/Collapse";

// Page selected using dropdown. Posts are hidden under categories, expandable.

const FeedPageList = () => {

    const [page, setPage] = useState(EFeedPage.HARDWARE.toString());
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const onPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("Event target: ", event.target.value);
        setPage(event.target.value);
    }

    const [pendingLocal, setPendingLocal] = useState(false);

    const displaySuccess = () => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
        }, 1000)
    }

    const service = new FeedService();
    const { data, pending, fetchData } = useFetch<IFeedPage>(service.getPage, [i18n.language, page]);


    const toCreateCategory = () => {
        navigate("./createCategory")
    }

    const toCreatePost = () => {
        navigate("./createPost")
    }

    const removeCategory = (id: string) => {
        setPendingLocal(true)
        service.deleteCategory(id).then(r => {
            displaySuccess();
        }).catch(e => {
            alert(e);
        }).finally(() => { 
            setPendingLocal(false); 
            fetchData() 
        })
    }

    const removePost = (id: string) => {
        setPendingLocal(true)
        service.deletePost(id).then(r => {
            displaySuccess();
        }).catch(e => {
            alert(e);
        }).finally(() => { 
            setPendingLocal(false); 
            fetchData() 
        })
    }

    const updatePost = (id: string) => {
        navigate(`./createPost/${id}`);
    }

    const updateCategory = (id: string) => {
        navigate(`./createPost/${id}`);
    }

    useEffect(() => {

    }, [page]);

    return <>
        <PageTitle>Feed pages</PageTitle>
        {(pending || pendingLocal) && <Loader />}
        <ButtonSmaller onClick={toCreateCategory} className="m-2">Create category</ButtonSmaller>
        <ButtonSmaller onClick={toCreatePost} className="m-2">Create post</ButtonSmaller>
        <FormFloating>
            <FormSelect value={page} onChange={onPageChange}>
                <option value={EFeedPage.HARDWARE}>{EFeedPage.HARDWARE}</option>
                <option value={EFeedPage.RESEARCH}>{EFeedPage.RESEARCH}</option>
            </FormSelect>
        </FormFloating>

        {data?.feedPageCategories.map((category) => {
            return <Collapse isActive={false} title={category.title} children={<div>

                {category.feedPageCategoryPost.length === 0 &&
                    <ButtonSmaller onClick={() => removeCategory(category.id)} className="m-2">Remove category</ButtonSmaller>}

                {category.feedPageCategoryPost.map(post => {
                    return <div className="">
                        <ButtonSmaller onClick={() => updatePost(post.id)} className="mt-2">Edit</ButtonSmaller>
                        <ButtonSmaller onClick={() => removePost(post.id)} className="mt-2">Delete</ButtonSmaller>
                        <FeedPagePostElement
                            feedPageCategoryId={""}
                            title={post.title}
                            body={post.body}
                            createdAt={post.createdAt}
                            id={""} /></div>
                })}

            </div>} />
        })}

    </>
}

export default FeedPageList;
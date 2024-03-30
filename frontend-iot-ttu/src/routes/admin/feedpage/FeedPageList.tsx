import {FormFloating, FormSelect} from "react-bootstrap";
import PageTitle from "../../../components/common/PageTitle";
import {EFeedPage} from "../../../dto/feedpage/EFeedPage";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ButtonSmaller from "../../../components/common/ButtonSmaller";
import {IFeedPage} from "../../../dto/feedpage/page/IFeedPage";
import useFetch from "../../../hooks/useFetch";
import {FeedService} from "../../../services/FeedService";
import i18n from "i18next";
import FeedPagePostElement from "./post/FeedPagePostElement";
import {Loader} from "../../../components/Loader";
import Collapse from "../../../components/Collapse";
import SubHeadingPurple from "../../../components/common/SubheadingPurple";
import removeIcon from "../../../assets/iconpack/delete.svg"
import edit from "../../../assets/iconpack/edit.svg"

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
    const {data, pending, fetchData} = useFetch<IFeedPage>(service.getPage, [i18n.language, page]);


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
        <SubHeadingPurple>Feed pages</SubHeadingPurple>
        {(pending || pendingLocal) && <Loader/>}
        <ButtonSmaller onClick={toCreateCategory} className="m-2">Create category</ButtonSmaller>
        <ButtonSmaller onClick={toCreatePost} className="m-2">Create post</ButtonSmaller>
        <FormFloating>
            <FormSelect className={"no-br"} value={page} onChange={onPageChange}>
                <option value={EFeedPage.HARDWARE}>{EFeedPage.HARDWARE}</option>
                <option value={EFeedPage.RESEARCH}>{EFeedPage.RESEARCH}</option>
            </FormSelect>
        </FormFloating>

        {data?.feedPageCategories.map((category) => {
            return <div className={"d-flex"}>
                <Collapse isActive={false} title={category.title} children={<div>


                    {category.feedPageCategoryPost.map(post => {
                        return <div className="d-flex mt-2">
                            <FeedPagePostElement
                                feedPageCategoryId={""}
                                title={post.title}
                                body={post.body}
                                createdAt={post.createdAt}
                                id={""}/>
                            <div className={"d-flex flex-column"}>
                                <img className={"icon mb-2"}
                                     onClick={() => {
                                         updatePost(post.id)
                                     }}
                                     alt={"Edit"}
                                     src={edit}/>
                                <img className={"icon mb-2"}
                                     onClick={() => removePost(post.id)}
                                     alt={"Delete"}
                                     src={removeIcon}/>
                            </div>
                        </div>
                    })}

                </div>}/>
                {category.feedPageCategoryPost.length === 0 &&
                    <div className={"d-flex justify-content-center align-items-center"}>
                        <img className={"icon mt-1 m-1"}
                             onClick={() => removeCategory(category.id)}
                             alt={"Delete"}
                             src={removeIcon}/>
                    </div>
                }

            </div>


        })}

    </>
}

export default FeedPageList;
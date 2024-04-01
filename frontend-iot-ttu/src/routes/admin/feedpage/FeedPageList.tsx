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
import Show from "../../../components/common/Show";
import ActionConfirmationAlert from "../../../components/common/ActionConfirmationAlert";
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation();

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
            return <div className={"d-flex mt-2"}>
                <Collapse isActive={false} title={category.title} children={<div>
                    {category.feedPageCategoryPost.map(post => {
                        return <div className="d-flex mt-2">
                            <FeedPagePostElement post={post}/>
                            <div className={"d-flex flex-column"}>
                                <div className={"icon-wrapper"}>
                                    <img className={"icon mb-2"}
                                         onClick={() => {
                                             updatePost(post.id)
                                         }}
                                         alt={"Edit"}
                                         src={edit}/>
                                </div>
                                <ActionConfirmationAlert
                                    action={() => removePost(post.id)}
                                displayText={"Are you sure you want to delete this post?"} triggerElement={<div
                                    className={"icon-wrapper"}>
                                    <img className={"icon mb-2"}
                                         alt={"Delete"}
                                         src={removeIcon}/>
                                </div>}/>
                            </div>

                        </div>
                    })}

                </div>}/>

                <Show>
                    <Show.When isTrue={category.feedPageCategoryPost.length === 0}>
                        <ActionConfirmationAlert action={() => removeCategory(category.id)}
                                                 displayText={t("common.deleteUSure")} triggerElement={
                            <div
                                className={"icon-wrapper d-flex justify-content-center align-content-center mx-2 mt-4"}>
                                <img className={"icon "}
                                     alt={"Delete"}
                                     src={removeIcon}/>
                            </div>}/>
                    </Show.When>
                </Show>
            </div>


        })}

    </>
}

export default FeedPageList;
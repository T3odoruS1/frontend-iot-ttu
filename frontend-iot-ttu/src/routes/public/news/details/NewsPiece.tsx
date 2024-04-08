import {useNavigate, useParams} from "react-router-dom";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";
import {useTranslation} from "react-i18next";
import ErrorPage from "../../../ErrorPage";
import NotFoundPage from "../../../NotFoundPage";
import useFetch from "../../../../hooks/useFetch";
import {INews} from "../../../../dto/news/INews";
import {NewsService} from "../../../../services/NewsService";
import i18n from "i18next";
import LayoutMulticolour from "../../../../components/structure/LayoutMulticolour";
import PageTitle from "../../../../components/common/PageTitle";
import {Col, Row} from "react-bootstrap";
import React from "react";
import {Loader} from "../../../../components/Loader";
import arrow from "../../../../assets/iconpack/Arrow Left.svg";

const NewsPiece = () => {
    const {t} = useTranslation();
    const {id} = useParams();
    const navigate = useNavigate();
    const newsService = new NewsService();

    const {data: news, pending, error} =
        useFetch<INews>(newsService.getById, [i18n.language, id ?? ""])
    const onContactUsClick = () => {
        if (news) {
            navigate(`../../contact?fromNews=${news.id}`)
        } else {
            navigate(`../../contact?fromNews`)
        }
    }

    const toTopicArea = (id: string) => {
        navigate(`../?topicArea=${id}`)
    }

    const onBack = () => {
        navigate("../")
    }

    if (error == "400" || error == "404") return <NotFoundPage/>
    if (error == "500") return <ErrorPage></ErrorPage>;
    if (!error) return (<LayoutMulticolour
        headerContent={
            <div className={"w-100 mb-2"}>
                {pending && <Loader/>}
                <div className={"d-flex"}>
                    <img onClick={onBack} className={"icon-wrapper arrow-left"} src={arrow}/>
                    <PageTitle>{news?.title}</PageTitle>
                </div>
                <Row className="w-100 mb-5">

                    <Col md="9">
                        <img
                            src={news?.image}
                            alt="Poster_image"
                            className="content_image max-w"
                        />
                    </Col>
                    <Col md="3" className={"mt-md-0 mt-2"}>
                        <p className={"text-small-gray"}>{t("common.date")}</p>
                        <h5 className={"header-pink mt-1"}>{new Date(news?.createdAt!).toLocaleDateString()}</h5>
                        <p className={"text-small-gray"}>{t("common.author")}</p>
                        <h5 className={"header-pink mt-1"}>{news?.author}</h5>
                        <p className={"text-small-gray"}>{t("common.topicAreas")}</p>
                        <h5 className={"header-pink mt-1"}>
                            {news?.topicAreas.map((topicArea, index) => {
                                return <span key={topicArea.id}
                                    onClick={() => {
                                        toTopicArea(topicArea.id)
                                    }}
                                    className={"clickable-pointer purple-on-hover"}>
                                    {topicArea.name}{news?.topicAreas.length !== index + 1 ? ", " : ""}
                                </span>
                            })}
                        </h5>
                    </Col>

                </Row>
            </div>
        }
        bodyContent={
            <div className="w-100 mt-2">
                <div className="quill">
                    <div className="result-div ql-container ql-snow" style={{position: "relative"}}>
                        <div
                            className="ql-editor"
                            dangerouslySetInnerHTML={{__html: news?.body ?? ""}}
                        />
                    </div>
                </div>
                <div className={"mt-5"}>
                    <ButtonPrimary onClick={onContactUsClick}>{t("public.news.contact")}</ButtonPrimary>
                </div>
            </div>
        }
    />);
    return <></>
};

export default NewsPiece;

<div>


</div>

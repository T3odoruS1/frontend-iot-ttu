import i18n from "i18next";
import {Col, Row, Table} from "react-bootstrap";
import ButtonSmaller from "../../../../components/common/ButtonSmaller";
import ActionConfirmationAlert from "../../../../components/common/ActionConfirmationAlert";
import {useNavigate} from "react-router-dom";
import PageTitle from "../../../../components/common/PageTitle";
import {Loader} from "../../../../components/Loader";
import ErrorPage from "../../../ErrorPage";
import {Fragment} from "react";
import useFetch from "../../../../hooks/useFetch";
import {INews} from "../../../../dto/news/INews";
import {NewsService} from "../../../../services/NewsService";
import {TopicAreaService} from "../../../../services/TopicAreaService";
import {useTranslation} from "react-i18next";
import {ITopicAreaGet} from "../../../../dto/topicarea/ITopicAreaGet";
import edit from "../../../../assets/iconpack/edit.svg";
import remove from "../../../../assets/iconpack/delete.svg";

import eye from "../../../../assets/iconpack/eye.svg"
import add from "../../../../assets/iconpack/add.svg";
import SubHeadingPurple from "../../../../components/common/SubheadingPurple";


const NewsListAdm = () => {

    const newsService = new NewsService();
    const topicAreaService = new TopicAreaService();

    const {data: news, setData: setNews, pending, error, fetchData} =
        useFetch<INews[]>(newsService.getAll, [i18n.language])
    const {data: topicAreas, pending: pendingTopicAreas, error: topicAreasError} =
        useFetch<ITopicAreaGet[]>(topicAreaService.getAll, [i18n.language]);

    let topicAreaIndex = 0;
    const navigate = useNavigate();
    const {t} = useTranslation();

    const onDelete = async (id: string) => {
        newsService.remove(id).then(fetchData).catch(e => {
            alert(e)
        })
    }

    const toCreate = () => {
        navigate("./create");
    }

    const toUpdate = (id: string) => {
        navigate(`./create/${id}`);
    }

    const toCreateTopic = () => {
        navigate("./topicarea");
    }

    const toDetails = (id: string) => {
        navigate(`./${id}`);
    }

    const onTopicAreaDelete = (id: string) => {
        alert("NOT IMPLEMENTED")
    }

    if (!pending && (!news || !topicAreas)) {
        return <ErrorPage/>
    }


    return (
        <div>
            <SubHeadingPurple>{t("news.news")}</SubHeadingPurple>
            <img className={"icon-wrapper-lg"}
                 alt={"Add"}
                 src={add}
                 onClick={toCreate}/>
            {pending && <Loader/>}

            <Table variant="striped">
                <caption>{t("news.news")}</caption>
                {/*{pending && <div className={"m-5 d-flex justify-content-center align-items-center"}><LineLoader/></div>}*/}
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">{t("news.title")}</th>
                    <th scope="col">{t("news.author")}</th>
                    <th scope="col">{t("common.views")}</th>
                    <th scope="col">{t("common.createdAt")}</th>
                    <th scope="col">{t("common.actions")}</th>
                </tr>
                </thead>
                <tbody>
                {news?.map((newsPiece, index) => {
                        return (
                            <tr key={newsPiece.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{newsPiece.title}</td>
                                <td>{newsPiece.author}</td>
                                <td>-</td>
                                <td>{(new Date(newsPiece.createdAt)).toLocaleDateString()}</td>
                                <td>
                                    <Row>
                                        <Col sm={"4"} className={"px-1"}>
                                            <div className={"icon-wrapper"} onClick={() => toUpdate(newsPiece.id)}>
                                                <img className={"icon"} alt={"Edit"} src={edit}/>
                                            </div>
                                        </Col>

                                        <Col sm={"4"} className={"px-1"}>
                                            <div className={"icon-wrapper"} onClick={() => {
                                                toDetails(newsPiece.id);
                                            }}>
                                                <img className={"icon"} alt={"View"} src={eye}/>
                                            </div>
                                        </Col>

                                        <Col sm={"4"} className={"px-1"}>
                                            <div className={""}>
                                                <ActionConfirmationAlert action={() => {
                                                    onDelete(newsPiece.id)
                                                }} displayText={t("common.deleteUSure")}
                                                                         triggerElement={<img className={"icon"}
                                                                                              alt={"Delete"}
                                                                                              src={remove}/>}/>
                                            </div>
                                        </Col>

                                    </Row>
                                </td>
                            </tr>
                        )
                    }
                )}
                </tbody>
            </Table>
            <br/>
            <br/>
            <hr/>
            <SubHeadingPurple>{t("common.topicAreas")}</SubHeadingPurple>

            <img className={"icon-wrapper-lg"}
                 alt={"Add"}
                 src={add}
                 onClick={toCreateTopic}/>
            <Table>
                <caption>Topic area list</caption>
                <thead>
                <tr>
                <th scope="col">#</th>
                    <th scope="col">{t("common.name")}</th>
                    <th scope="col">{t("news.numberOfPosts")}</th>
                    <th scope="col">{t("common.actions")}</th>
                </tr>
                </thead>

                <tbody>
                {topicAreas?.map((topicArea, index) => {
                    return (<Fragment key={topicArea.id}>
                        <tr>
                            <th scope="row">{topicAreaIndex = topicAreaIndex + 1}</th>
                            <td>{topicArea.name}</td>
                            <td>-</td>
                            <td><ActionConfirmationAlert action={() => {
                                onTopicAreaDelete(topicArea.id)
                            }} displayText={t("common.deleteUSure")}
                                                         triggerElement={<img className={"icon"} alt={"Delete"}
                                                                              src={remove}/>}/></td>
                        </tr>
                    </Fragment>)
                })}
                </tbody>
            </Table>
        </div>
    );
};

export default NewsListAdm;
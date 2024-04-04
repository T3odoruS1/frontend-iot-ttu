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
import {ITopicAreaWithCount} from "../../../../dto/topicarea/ITopicAreaWithCount";
import Show from "../../../../components/common/Show";
import LayoutNoHeader from "../../../../components/structure/LayoutNoHeader";


const NewsListAdm = () => {

    const newsService = new NewsService();
    const topicAreaService = new TopicAreaService();

    const {data: news, setData: setNews, pending, error, fetchData} =
        useFetch<INews[]>(newsService.getAll, [i18n.language])
    const {data: topicAreas, pending: pendingTopicAreas, error: topicAreasError, fetchData: fetchTopicAreas} =
        useFetch<ITopicAreaWithCount[]>(topicAreaService.getAll, [i18n.language]);

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
        topicAreaService.remove(id).then(() => {
            fetchTopicAreas()
        })
    }


    return (
<LayoutNoHeader bodyContent={<div>
    <div className={"d-flex"}>
        <SubHeadingPurple className={"mt-2"}>{t("news.news")}</SubHeadingPurple>
        <img className={"icon-wrapper"}
             alt={"Add"}
             src={add}
             onClick={toCreate}/>
    </div>
    {pending && <Loader/>}

    <Table responsive variant="striped">
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
                        <td>{newsPiece.viewCount}</td>
                        <td>{(new Date(newsPiece.createdAt)).toLocaleDateString()}</td>
                        <td>
                            <div className={"d-flex"}>
                                <div className={"icon-wrapper "} onClick={() => toUpdate(newsPiece.id)}>
                                    <img className={"icon"} alt={"Edit"} src={edit}/>
                                </div>

                                <div className={"icon-wrapper ms-4"} onClick={() => {
                                    toDetails(newsPiece.id);
                                }}>
                                    <img className={"icon"} alt={"View"} src={eye}/>
                                </div>

                                <ActionConfirmationAlert action={() => {
                                    onDelete(newsPiece.id)
                                }} displayText={t("common.deleteUSure")}
                                                         triggerElement={<div className={"icon-wrapper ms-4"}>
                                                             <img className={"icon"}
                                                                  alt={"Delete"}
                                                                  src={remove}/>
                                                         </div>}/>
                            </div>
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
    <div className={"d-flex"}>
        <SubHeadingPurple className={"mt-2"}>{t("common.topicAreas")}</SubHeadingPurple>

        <img className={"icon-wrapper"}
             alt={"Add"}
             src={add}
             onClick={toCreateTopic}/>

    </div>
    <Table responsive>
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
                    <td>{topicArea.count}</td>
                    <td>
                        <Show>
                            <Show.When isTrue={topicArea.count === 0}>
                                <ActionConfirmationAlert action={() => {
                                    onTopicAreaDelete(topicArea.id)
                                }} displayText={t("common.deleteUSure")}
                                                         triggerElement={
                                                             <div
                                                                 className={"icon-wrapper"}>
                                                                 <img
                                                                     className={"icon"}
                                                                     alt={"Delete"}
                                                                     src={remove}/>
                                                             </div>}/>
                            </Show.When>
                        </Show>
                    </td>
                </tr>
            </Fragment>)
        })}
        </tbody>
    </Table>
</div>}/>
    );
};

export default NewsListAdm;
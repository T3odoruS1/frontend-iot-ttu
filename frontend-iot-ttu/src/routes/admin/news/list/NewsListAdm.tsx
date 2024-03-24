import i18n from "i18next";
import {Table} from "react-bootstrap";
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
        newsService.remove(id).then(fetchData).catch(e => {alert(e)})
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

    }

    if (!pending && (!news || !topicAreas)) {
        return <ErrorPage/>
    }


    return (
        <div>
            <PageTitle>{t("news.news")}</PageTitle>
            <div className={"mb-3"}><ButtonSmaller onClick={toCreate}>{t("common.new")}</ButtonSmaller></div>
            {pending && <Loader/>}

            <Table variant="striped">
                <caption>{t("news.news")}</caption>
                {/*{pending && <div className={"m-5 d-flex justify-content-center align-items-center"}><LineLoader/></div>}*/}
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">{t("news.title")}</th>
                    <th scope="col">{t("news.author")}</th>
                    <th scope="col">{t("common.createdBy")}</th>
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
                                <td>-</td>
                                <td>{(new Date(newsPiece.createdAt)).toLocaleDateString()}</td>
                                <td>
                                    <ButtonSmaller onClick={() => {
                                        toUpdate(newsPiece.id)
                                    }} className="mb-2">{t("common.update")}</ButtonSmaller><br/>
                                    <ButtonSmaller onClick={() => {
                                        toDetails(newsPiece.id);
                                    }} className="mb-2">{t("common.view")}</ButtonSmaller><br/>
                                    <ActionConfirmationAlert action={() => {
                                        onDelete(newsPiece.id)
                                    }} displayText={t("common.deleteUSure")}
                                                             buttonText={t("common.delete")}/>
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
            <PageTitle>Topic areas</PageTitle>

            <div className={"m-2"}>
                <ButtonSmaller type={"button"} onClick={toCreateTopic}>{t("common.new")}</ButtonSmaller>
            </div>
            <Table>
                <caption>Topic area list</caption>
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">{t("common.name")}</th>
                    <th scope="col">{t("common.createdAt")}</th>
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
                            <td>-</td>
                            <td><ButtonSmaller>{t('common.delete')}</ButtonSmaller></td>
                        </tr>
                    </Fragment>)
                })}
                </tbody>
            </Table>
        </div>
    );
};

export default NewsListAdm;
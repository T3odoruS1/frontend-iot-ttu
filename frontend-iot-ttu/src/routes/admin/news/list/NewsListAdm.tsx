import i18n from "i18next";
import {Table} from "react-bootstrap";
import ButtonSmaller from "../../../../components/common/ButtonSmaller";
import ActionConfirmationAlert from "../../../../components/common/ActionConfirmationAlert";
import {useNavigate} from "react-router-dom";
import PageTitle from "../../../../components/common/PageTitle";
import {Loader} from "../../../../components/Loader";
import ErrorPage from "../../../ErrorPage";
import {Fragment} from "react";
import {NotAuthenticated} from "../../NotAuthenticated";
import useFetch from "../../../../hooks/useFetch";
import {INews} from "../../../../dto/news/INews";
import {NewsService} from "../../../../services/NewsService";
import {TopicAreaService} from "../../../../services/TopicAreaService";
import {ITopicAreaWithChildren} from "../../../../dto/topicarea/ITopicAreaWithChildren";

const NewsListAdm = () => {

    const newsService = new NewsService();
    const topicAreaService = new TopicAreaService();

    const {data: news, setData: setNews, pending, error} =
        useFetch<INews[]>(newsService.getAll, [i18n.language])
    const {data: topicAreas, pending: pendingTopicAreas, error: topicAreasError} =
        useFetch<ITopicAreaWithChildren[]>(topicAreaService.getAll, [i18n.language]);

    let topicAreaIndex = 0;
    const navigate = useNavigate();
    const onDelete = async (id: string) => {
        await newsService.remove(id);
        let filtered = news!.filter(function (obj) {
            return obj.id !== id;
        });
        setNews(filtered);
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

    if(error && error == "401"){
        return <NotAuthenticated/>
    }


    if (!pending && (!news || !topicAreas)) {
        return <ErrorPage/>
    }


    return (
        <div>
            <PageTitle>News</PageTitle>
            <div className={"mb-3"}><ButtonSmaller onClick={toCreate}>Create</ButtonSmaller></div>
            {pending && <Loader/>}

            <Table variant="striped">
                <caption>News list</caption>
                {/*{pending && <div className={"m-5 d-flex justify-content-center align-items-center"}><LineLoader/></div>}*/}
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Created by</th>
                    <th scope="col">Views</th>
                    <th scope="col">Created at</th>
                    <th scope="col">Actions</th>
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
                                    }} className="mb-2">Update</ButtonSmaller><br/>
                                    <ButtonSmaller onClick={() => {
                                        toDetails(newsPiece.id);
                                    }} className="mb-2">View</ButtonSmaller><br/>
                                    <ActionConfirmationAlert action={() => {
                                        onDelete(newsPiece.id)
                                    }} displayText={"Are you sure you want to delete this news piece?"}
                                                             buttonText={"Delete"}/>
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
                <ButtonSmaller type={"button"} onClick={toCreateTopic}>Create</ButtonSmaller>
            </div>
            <Table>
                <caption>Topic area list</caption>
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nimi</th>
                    <th scope="col">Laps</th>
                    <th scope="col">Created at</th>
                    <th scope="col">Postituse arv</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>

                <tbody>
                {topicAreas?.map((topicArea, index) => {
                    return (<Fragment key={topicArea.id}>
                        <tr>
                            <th scope="row">{topicAreaIndex = topicAreaIndex + 1}</th>
                            <td>{topicArea.name}</td>
                            <td></td>
                            <td>-</td>
                            <td>-</td>
                            <td><ButtonSmaller>Delete</ButtonSmaller></td>
                        </tr>

                        {topicArea.childrenTopicAreas?.map((child, index) => {
                            return (<tr key={child.id}>
                                <th scope="row">{topicAreaIndex = topicAreaIndex + 1}</th>
                                <td></td>
                                <td>{child.name}</td>
                                <td>-</td>
                                <td>-</td>
                                <td><ButtonSmaller>Delete</ButtonSmaller></td>

                            </tr>)
                        })
                        }
                    </Fragment>)
                })}
                </tbody>
            </Table>
        </div>
    );
};

export default NewsListAdm;
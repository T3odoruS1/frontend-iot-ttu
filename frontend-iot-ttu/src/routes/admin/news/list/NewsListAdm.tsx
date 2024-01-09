import i18n from "i18next";
import {Table} from "react-bootstrap";
import ButtonSmaller from "../../../../components/common/ButtonSmaller";
import ActionConfirmationAlert from "../../../../components/common/ActionConfirmationAlert";
import {useNavigate} from "react-router-dom";
import useNewsList from "../../../../hooks/useNewsList";
import PageTitle from "../../../../components/common/PageTitle";
import useTopicAreas from "../../../../hooks/useTopicAreas";
import {Loader} from "../../../../components/Loader";

const NewsListAdm = () => {

    const {news, setNews, pending, remove} = useNewsList();
    const {topicAreas} = useTopicAreas();

    let topicAreaIndex = 0;
    const navigate = useNavigate();
    const onDelete = async (id: string) => {
        await remove(id);
        let filtered = news.filter(function (obj) {
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


    return (
        <div>
            <PageTitle>News</PageTitle>
            <div className={"mb-3"}><ButtonSmaller onClick={toCreate}>Create</ButtonSmaller></div>
            {pending && <Loader/>}
            <Table variant="striped">
                <caption>News list</caption>
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
                {news.map((newsPiece, index) => {
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
            {/*TODO optimize requests*/}
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
                    {topicAreas.map((topicArea, index) => {
                        return (<><tr key={topicArea.id}>
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
                        </>)})}
                </tbody>
            </Table>
        </div>
    );
};

export default NewsListAdm;
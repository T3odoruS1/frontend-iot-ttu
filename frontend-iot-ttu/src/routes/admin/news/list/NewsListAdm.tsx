import i18n from "i18next";
import {Table} from "react-bootstrap";
import ButtonSmaller from "../../../../components/common/ButtonSmaller";
import ActionConfirmationAlert from "../../../../components/common/ActionConfirmationAlert";
import {useNavigate} from "react-router-dom";
import useNewsList from "../../../../hooks/useNewsList";

const NewsListAdm = () => {

    const {news, setNews, pending, remove} = useNewsList();

    const navigate = useNavigate();
    const onDelete = async (id: string) => {
        await remove(id);
        let filtered = news.filter(function( obj ) {
            return obj.id === id;
        });
        setNews(filtered);
    }

    const toCreate = () => {
        navigate("./create");
    }

    const toUpdate = (id: string) => {
        navigate(`./create/${id}`);
    }
    return (
        <div >
            <div className={"mb-3"}><ButtonSmaller onClick={toCreate}>Create</ButtonSmaller></div>
            {pending && <p>Loading...</p>}
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
                                <td>NOT IMPL</td>
                                <td>NOT IMPL</td>
                                <td>{(new Date(newsPiece.createdAt)).toLocaleDateString()}</td>
                                <td>
                                    <ButtonSmaller onClick={() => {toUpdate(newsPiece.id)}} className="mb-2">Update</ButtonSmaller><br/>
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
        </div>
    );
};

export default NewsListAdm;
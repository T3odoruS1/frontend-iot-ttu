import usePaginatedFetch from "../../../../hooks/usePaginatedFetch";
import {ProjectService} from "../../../../services/ProjectService";
import {IProject} from "../../../../dto/project/IProject";
import ProjectsAdm from "../ProjectsAdm";
import useTopicAreas from "../../../../hooks/useTopicAreas";
import PageTitle from "../../../../components/common/PageTitle";
import ErrorPage from "../../../ErrorPage";
import {useNavigate} from "react-router-dom";
import ButtonSmaller from "../../../../components/common/ButtonSmaller";
import {Loader} from "../../../../components/Loader";
import ActionConfirmationAlert from "../../../../components/common/ActionConfirmationAlert";
import {Table} from "react-bootstrap";
import useProjectList from "../../../../hooks/useProjectList";
import {Fragment} from "react";

export const ProjectListAdm = () => {

    const {projects, setProjects,  pending, error, remove} = useProjectList();
    const {topicAreas, pending: pendingTopicAreas, error: topicAreasError} = useTopicAreas();

    const navigate = useNavigate();

    let topicAreaIndex = 0;


    const onDelete = async (id: string) => {
        await remove(id);
        let filtered = projects.filter(function (obj) {
            return obj.id !== id;
        });
        setProjects(filtered);
    }


    if (error) {
        return <ErrorPage/>
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
            <PageTitle>Projects</PageTitle>
            <div className={"mb-3"}><ButtonSmaller onClick={toCreate}>Create</ButtonSmaller></div>
            {pending && <Loader/>}


            <Table variant="striped">
                <caption>Projects</caption>
                {/*{pending && <div className={"m-5 d-flex justify-content-center align-items-center"}><LineLoader/></div>}*/}
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Created by</th>
                    <th scope="col">Views</th>
                    <th scope="col">Created at</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                {projects.map((project, index) => {
                        return (
                            <tr key={project.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{project.title}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>{(new Date(project.createdAt)).toLocaleDateString()}</td>
                                <td>
                                    <ButtonSmaller onClick={() => {
                                        toUpdate(project.id)
                                    }} className="mb-2">Update</ButtonSmaller><br/>
                                    <ButtonSmaller onClick={() => {
                                        toDetails(project.id);
                                    }} className="mb-2">View</ButtonSmaller><br/>
                                    <ActionConfirmationAlert action={() => {
                                        onDelete(project.id)
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
                {/*{pendingTopicAreas && <div className={"w-100 m-5 d-flex justify-content-center align-items-center"}><LineLoader/></div>}*/}

                <tbody>
                {topicAreas.map((topicArea, index) => {
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
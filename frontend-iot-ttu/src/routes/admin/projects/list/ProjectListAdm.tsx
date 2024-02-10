import {ProjectService} from "../../../../services/ProjectService";
import {IProject} from "../../../../dto/project/IProject";
import PageTitle from "../../../../components/common/PageTitle";
import ErrorPage from "../../../ErrorPage";
import {useNavigate} from "react-router-dom";
import ButtonSmaller from "../../../../components/common/ButtonSmaller";
import {Loader} from "../../../../components/Loader";
import ActionConfirmationAlert from "../../../../components/common/ActionConfirmationAlert";
import {Table} from "react-bootstrap";
// import {Fragment, useContext} from "react";
import useFetch from "../../../../hooks/useFetch";
import i18n from "i18next";
import {useTranslation} from "react-i18next";

const ProjectListAdm = () => {

    // const {jwtResponseCtx, setJwtResponseCtx} = useContext(JwtContext);

    const projectService = new ProjectService();
    const {data: projects, setData: setProjects,  pending, error}
        = useFetch<IProject[]>(projectService.getAll, [i18n.language]);

    const navigate = useNavigate();
    const {t} = useTranslation();

    const onDelete = async (id: string) => {
        await projectService.remove(id);
        let filtered = projects!.filter(function (obj) {
            return obj.id !== id;
        });
        setProjects(filtered);
    }


    if (!pending && (error || !projects)) {
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
            <PageTitle>{t("projects.projects")}</PageTitle>
            <div className={"mb-3"}><ButtonSmaller onClick={toCreate}>{t('common.new')}</ButtonSmaller></div>
            {pending && <Loader/>}


            <Table variant="striped">
                <caption>{t("projects.projects")}</caption>
                {/*{pending && <div className={"m-5 d-flex justify-content-center align-items-center"}><LineLoader/></div>}*/}
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">{t("common.title")}</th>
                    <th scope="col">{t("common.createdBy")}</th>
                    <th scope="col">{t("common.views")}</th>
                    <th scope="col">{t("common.createdAt")}</th>
                    <th scope="col">{t("common.actions")}</th>
                </tr>
                </thead>
                <tbody>
                {projects?.map((project, index) => {
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
                                    }} className="mb-2">{t("common.update")}</ButtonSmaller><br/>
                                    <ButtonSmaller onClick={() => {
                                        toDetails(project.id);
                                    }} className="mb-2">{t("common.view")}</ButtonSmaller><br/>
                                    <ActionConfirmationAlert action={() => {
                                        onDelete(project.id)
                                    }} displayText={t("common.deleteUSure")}
                                                             buttonText={t("common.delete")}/>
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

export default ProjectListAdm;
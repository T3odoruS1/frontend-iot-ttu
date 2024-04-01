import {ProjectService} from "../../../../services/ProjectService";
import {IProject} from "../../../../dto/project/IProject";
import ErrorPage from "../../../ErrorPage";
import {useNavigate} from "react-router-dom";
import {Loader} from "../../../../components/Loader";
import ActionConfirmationAlert from "../../../../components/common/ActionConfirmationAlert";
import {Table} from "react-bootstrap";
import useFetch from "../../../../hooks/useFetch";
import i18n from "i18next";
import {useTranslation} from "react-i18next";
import edit from "../../../../assets/iconpack/edit.svg";
import eye from "../../../../assets/iconpack/eye.svg";
import remove from "../../../../assets/iconpack/delete.svg";
import add from "../../../../assets/iconpack/add.svg";
import SubHeadingPurple from "../../../../components/common/SubheadingPurple";

const ProjectListAdm = () => {

    // const {jwtResponseCtx, setJwtResponseCtx} = useContext(JwtContext);

    const projectService = new ProjectService();
    const {data: projects, setData: setProjects, pending, error}
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
            <div className={"d-flex"}>
                <SubHeadingPurple className={"mt-2"}>{t("projects.projects")}</SubHeadingPurple>
                <img className={"icon-wrapper"}
                     alt={"Add"}
                     src={add}
                     onClick={toCreate}/>

            </div>
            {pending && <Loader/>}

            <Table responsive variant="striped">
                <caption>{t("projects.projects")}</caption>
                {/*{pending && <div className={"m-5 d-flex justify-content-center align-items-center"}><LineLoader/></div>}*/}
                <thead>
                <tr>
                    <th scope="col">{t("common.title")}</th>
                    <th scope="col">{t("common.views")}</th>
                    <th scope="col">{t("common.createdAt")}</th>
                    <th scope="col">{t("common.actions")}</th>
                </tr>
                </thead>
                <tbody>
                {projects?.map((project, index) => {
                        return (
                            <tr key={project.id}>
                                <td>{project.title}</td>
                                <td >{project.viewCount}</td>
                                <td >{(new Date(project.createdAt)).toLocaleDateString()}</td>
                                <td >
                                    <div className={"d-flex"}>
                                            <div className={"icon-wrapper"} onClick={() => toUpdate(project.id)}>
                                                <img className={"icon"} alt={"Edit"} src={edit}/>
                                            </div>

                                            <div className={"icon-wrapper ms-4"} onClick={() => {
                                                toDetails(project.id);
                                            }}>
                                                <img className={"icon"} alt={"View"} src={eye}/>
                                            </div>


                                            <div className={""}>
                                                <ActionConfirmationAlert action={() => {
                                                    onDelete(project.id)
                                                }} displayText={t("common.deleteUSure")}
                                                                         triggerElement={<div
                                                                             className={"icon-wrapper ms-4"}><img
                                                                             className={"icon"}
                                                                             alt={"Delete"}
                                                                             src={remove}/></div>}/>
                                            </div>
                                    </div>
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
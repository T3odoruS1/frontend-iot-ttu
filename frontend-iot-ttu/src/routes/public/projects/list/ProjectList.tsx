import {useTranslation} from "react-i18next";
import {FC, useState} from "react";
import usePaginatedFetch from "../../../../hooks/usePaginatedFetch";
import {ProjectService} from "../../../../services/ProjectService";
import {IProject} from "../../../../dto/project/IProject";
import {Loader} from "../../../../components/Loader";
import {Col, Row} from "react-bootstrap";
import EditablePage from "../../editablePage/EditablePage";
import ErrorPage from "../../../ErrorPage";
import {useNavigate} from "react-router-dom";
import {formatCurrency} from "../../../../utils/roundNumber";

interface IProps {
    project: IProject
}

export const ProjectCardElement: FC<IProps> = ({project}) => {
    const navigate = useNavigate();

    const navigateToDetails = () => {
        navigate(`./${project.id}`);
    }

    const {t} = useTranslation();


    return (<Col md={12}>

            <div onClick={navigateToDetails} className={"notification w-100 my-2"}>
                <div className={"notiglow"}></div>
                <div className="notiborderglow"></div>
                <h3 className="notititle header-purple">{project.title}</h3>
                <div className="notibody">
                    <p className={"text-small-gray mt-4"}>{t("common.year")}</p>
                    <h5 className={"header-pink mt-1"}>{project.year}</h5>
                    <p className={"text-small-gray mt-4"}>{t("common.projectManager")}</p>
                    <h5 className={"header-pink mt-1"}>{project.projectManager}</h5>
                    <p className={"text-small-gray mt-4"}>{t("common.volume")}</p>
                    <h5 className={"header-pink mt-1"}>{formatCurrency(project.projectVolume)}</h5>
                </div>
            </div>
        </Col>

    );
};

const ProjectList = () => {

    const [page, setPage] = useState(0)
    const {t} = useTranslation();

    const {data: projects, pending, error, total} =
        usePaginatedFetch<IProject, ProjectService>(new ProjectService())

    if(error == "500") return <ErrorPage/>

    return (
        <>
            <EditablePage pageIdentifier={"projects"} showTitle={true}/>
            <hr/>
            {pending ? <Loader/> :
                (<Row>
                    {projects.map((proj) => {
                        return <ProjectCardElement project={proj}/>
                    })}
                </Row>)}
        </>
    );
};

export default ProjectList;
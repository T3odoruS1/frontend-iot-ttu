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
import KeyVal from "../../../../components/structure/KeyVal";
import LayoutMulticolour from "../../../../components/structure/LayoutMulticolour";


interface IProps {
    project: IProject
}



export const ProjectCardElement: FC<IProps> = ({project}) => {
    const navigate = useNavigate();

    const navigateToDetails = () => {
        navigate(`./${project.id}`);
    }

    const {t} = useTranslation();


    return (<Col md={6} onClick={navigateToDetails}>
            <div className={"mb-5 p-2"}>
                <div className={"d-md-flex d-block"}>
                    <KeyVal label={t("common.year")} value={project.year.toString()}/>
                    <KeyVal label={t("common.projectManager")} value={project.projectManager} cname={"mx-md-2"}/>
                    <KeyVal label={t("common.volume")} value={formatCurrency(project.projectVolume)} cname={"mx-md-2"}/>
                </div>
                <h1>
                    {project.title}
                </h1>
            </div>
        </Col>

    );
};

const ProjectList = () => {
    const {data: projects, pending, error, total} =
        usePaginatedFetch<IProject, ProjectService>(new ProjectService())

    if (error == "500") return <ErrorPage/>

    return (
        <>
            <div className={"layout-boundary"}>
            </div>
            <div className={"gray-bg bg-fill"}>
                <div className={"layout-boundary"}>

                </div>
            </div>

            <LayoutMulticolour
                headerContent={
                    <EditablePage pageIdentifier={"projects"} showTitle={true}/>
                }
                bodyContent={
                    pending ? <Loader/> :
                            (<Row className={"mt-2"}>
                                {projects.map((proj) => {
                                    return <ProjectCardElement project={proj}/>
                                })}
                            </Row>)
            }/>

        </>
    );
};

export default ProjectList;
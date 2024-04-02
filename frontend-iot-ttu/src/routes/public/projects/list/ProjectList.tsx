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

const KeyVal: FC<{ label: string, value: string, cname?: string }> = ({label, value, cname}) => {
    return (
        <div className={`${cname} d-flex`}>
            <h5 className={"proj-key pb-1 mt-1"}>
               {label}
            </h5>
            <h5 className={"header-pink mx-2"}>
                {value}
            </h5>
        </div>)
}

export const ProjectCardElement: FC<IProps> = ({project}) => {
    const navigate = useNavigate();

    const navigateToDetails = () => {
        navigate(`./${project.id}`);
    }

    const {t} = useTranslation();


    return (<Col md={6}>

            {/*<div onClick={navigateToDetails} className={"notification w-100 my-2"}>*/}
            {/*    <div className={"notiglow"}></div>*/}
            {/*    <div className="notiborderglow"></div>*/}
            {/*    <h3 className="notititle header-purple">{project.title}</h3>*/}
            {/*    <div className="notibody">*/}
            {/*        <p className={"text-small-gray mt-4"}>{t("common.year")}</p>*/}
            {/*        <h5 className={"header-pink mt-1"}>{project.year}</h5>*/}
            {/*        <p className={"text-small-gray mt-4"}>{t("common.projectManager")}</p>*/}
            {/*        <h5 className={"header-pink mt-1"}>{project.projectManager}</h5>*/}
            {/*        <p className={"text-small-gray mt-4"}>{t("common.volume")}</p>*/}
            {/*        <h5 className={"header-pink mt-1"}>{formatCurrency(project.projectVolume)}</h5>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className={"mb-5 p-2"}>
                <div className={"d-md-flex d-block"}>
                    <KeyVal label={t("common.year")} value={project.year.toString()}/>
                    <KeyVal label={t("common.projectManager")} value={project.projectManager} cname={"mx-md-2"}/>
                    <KeyVal label={t("common.volume")} value={formatCurrency(project.projectVolume)} cname={"mx-md-2"}/>
                </div>
                <h3 className={"header-purple"}>
                    {project.title}
                </h3>
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
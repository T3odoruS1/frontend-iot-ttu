import {useTranslation} from "react-i18next";
import {useState} from "react";
import usePaginatedFetch from "../../../../hooks/usePaginatedFetch";
import {ProjectService} from "../../../../services/ProjectService";
import {IProject} from "../../../../dto/project/IProject";
import PageTitle from "../../../../components/common/PageTitle";
import {Loader} from "../../../../components/Loader";
import {Col, Row} from "react-bootstrap";
import TopicAreaFilters from "../../../../components/common/FilterBox";
import {ProjectCardElement} from "./ProjectCardElement";
import Popup from "../../../../components/Popup";
import ProjectDetails from "../details/ProjectDetails";
import EditablePage from "../../editablePage/EditablePage";

export const ProjectList = () => {

    const [page, setPage] = useState(0)
    const {t} = useTranslation();

    const {data: projects, pending, error, total} =
        usePaginatedFetch<IProject, ProjectService>(new ProjectService())

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
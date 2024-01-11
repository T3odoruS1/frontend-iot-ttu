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

export const ProjectList = () => {

    const [page, setPage] = useState(0)
    const {t} = useTranslation();

    const {data: projects, pending, error, total} =
        usePaginatedFetch<IProject, ProjectService>(new ProjectService())

    return (
        <>
            <PageTitle>Projects</PageTitle>
            <p>Embedded AI Research Lab has started cooperation with private sector companies in 2016. Since that we
                have successfully finished many projects that cover wide range of competences. For detailed information
                about the projects click on the title of the project.</p>
            <p>* Year inside the parentheses means an ongoing project.</p>
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
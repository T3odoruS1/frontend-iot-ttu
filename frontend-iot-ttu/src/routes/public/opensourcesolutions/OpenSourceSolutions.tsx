import {useTranslation} from "react-i18next";
import {OpenSourceSolutionService} from "../../../services/OpenSourceSolutionService";
import useFetch from "../../../hooks/useFetch";
import {IOpenSourceSolution} from "../../../dto/opensourcesolutions/IOpenSourceSolution";
import PageTitle from "../../../components/common/PageTitle";
import {Loader} from "../../../components/Loader";
import {Row} from "react-bootstrap";
import React from "react";
import OSSCard from "./OssCard";
import useDocumentTitle from "../../../hooks/useDocumentTitle";

const OpenSourceSolutions = () => {
    const {i18n, t} = useTranslation();
    const service = new OpenSourceSolutionService();
    const {data, pending, error, fetchData} =
        useFetch<IOpenSourceSolution[]>(service.getAll, [i18n.language])
    useDocumentTitle(t("titles.oss"))
    return <>
        <PageTitle>Vabavaralised lahendused</PageTitle>
        {pending && <Loader/>}
        <Row>
            {data?.map(solution => {
                return <OSSCard solution={solution}/>
            })}
        </Row>
    </>
}

export default OpenSourceSolutions;
import {useTranslation} from "react-i18next";
import {OpenSourceSolutionService} from "../../../services/OpenSourceSolutionService";
import useFetch from "../../../hooks/useFetch";
import {IOpenSourceSolution} from "../../../dto/opensourcesolutions/IOpenSourceSolution";
import PageTitle from "../../../components/common/PageTitle";
import {Loader} from "../../../components/Loader";
import {Row} from "react-bootstrap";
import React, {Fragment} from "react";
import OSSCard from "./OssCard";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import LayoutMulticolour from "../../../components/structure/LayoutMulticolour";

const OpenSourceSolutions = () => {
    const {i18n, t} = useTranslation();
    const service = new OpenSourceSolutionService();
    const {data, pending, error, fetchData} =
        useFetch<IOpenSourceSolution[]>(service.getAll, [i18n.language])
    useDocumentTitle(t("titles.oss"))
    return <>
        <LayoutMulticolour headerContent={
            <PageTitle>{t("titles.oss")}</PageTitle>

        } bodyContent={<>
            {pending && <Loader/>}
            <div className={"mt-5"}>
                {data?.map(solution => {
                    return <div className={"mb-4"} key={solution.id}><OSSCard solution={solution}/></div>
                })}
            </div>
        </>}/>

    </>
}

export default OpenSourceSolutions;
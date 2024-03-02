import PageTitle from "../../../components/common/PageTitle";
import {OpenSourceSolutionService} from "../../../services/OpenSourceSolutionService";
import useFetch from "../../../hooks/useFetch";
import {IOpenSourceSolution} from "../../../dto/opensourcesolutions/IOpenSourceSolution";
import {useTranslation} from "react-i18next";
import {Loader} from "../../../components/Loader";
import React from "react";
import {Table} from "react-bootstrap";
import ButtonSmaller from "../../../components/common/ButtonSmaller";
import ActionConfirmationAlert from "../../../components/common/ActionConfirmationAlert";
import ErrorPage from "../../ErrorPage";
import {useNavigate} from "react-router-dom";

const OpenSourceSolutionAdm = () => {
    const {i18n, t} = useTranslation();
    const service = new OpenSourceSolutionService();
    const navigate = useNavigate();
    const {data, pending, error, fetchData} =
        useFetch<IOpenSourceSolution[]>(service.getAll, [i18n.language]);
    const onDelete = async (id: string) => {
        await service.delete(id);
        fetchData();
    }


    if (!pending && (error || !data)) {
        return <ErrorPage/>
    }

    const toCreate = () => {
        navigate("./create");
    }

    const toUpdate = (id: string) => {
        navigate(`./create/${id}`);
    }


    return <>
        <PageTitle>Vabavaralised lahendused</PageTitle>
        {pending && <Loader/>}
        <div className={"mb-3"}><ButtonSmaller onClick={toCreate}>{t('common.new')}</ButtonSmaller></div>

        <Table variant="striped">
            <caption>Open source solutions</caption>
            {/*{pending && <div className={"m-5 d-flex justify-content-center align-items-center"}><LineLoader/></div>}*/}
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">{t("common.title")}</th>
                <th scope="col">{t("common.actions")}</th>
            </tr>
            </thead>
            <tbody>
            {data?.map((solution, index) => {
                    return (
                        <tr key={solution.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{solution.title}</td>
                            <td>
                                <ButtonSmaller onClick={() => {
                                    toUpdate(solution.id)
                                }} className="mb-2">{t("common.update")}</ButtonSmaller><br/>
                                <ActionConfirmationAlert action={() => {
                                    onDelete(solution.id)
                                }} displayText={t("common.deleteUSure")}
                                                         buttonText={t("common.delete")}/>
                            </td>
                        </tr>
                    )
                }
            )}
            </tbody>
        </Table>

    </>
}

export default OpenSourceSolutionAdm;

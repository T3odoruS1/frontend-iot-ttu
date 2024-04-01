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
import add from "../../../assets/iconpack/add.svg"
import removeIcon from "../../../assets/iconpack/delete.svg"
import edit from "../../../assets/iconpack/edit.svg"
import SubHeadingPurple from "../../../components/common/SubheadingPurple";


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

        <div className={"d-flex"}>
            <SubHeadingPurple className={"mt-2"}>{t("titles.oss")}</SubHeadingPurple>
            <img className={"icon-wrapper"}
                 alt={"Add"}
                 onClick={toCreate}
                 src={add}/>
        </div>

        {pending && <Loader/>}
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
                            <td className={"d-flex"}>
                                <div className={"mr-1 icon-wrapper"}>
                                    <img className={"icon"}
                                         alt={"Update"}
                                         src={edit}/>
                                </div>
                                <ActionConfirmationAlert action={() => {
                                    onDelete(solution.id)
                                }} displayText={t("common.deleteUSure")}
                                                         triggerElement={<div className={"icon-wrapper"}>
                                                             <img
                                                                 className={"icon mx-2"}
                                                                 alt={"Delete"}
                                                                 src={removeIcon}/></div>}/>
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

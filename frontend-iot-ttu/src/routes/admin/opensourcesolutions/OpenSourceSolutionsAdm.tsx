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
import {AccessDetail} from "./AccessDetail";
import Checkbox
    from "@react-buddy/ide-toolbox/dist/previews/tools-panel/props-edit-table/table-items/table-item/table-item-control/checkbox";


const OpenSourceSolutionAdm = () => {
    const {i18n, t} = useTranslation();
    const service = new OpenSourceSolutionService();
    const navigate = useNavigate();
    const {data, pending, error, fetchData} =
        useFetch<IOpenSourceSolution[]>(service.getAllWEmails, [i18n.language]);
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
                <th scope="col">{t("common.title")}</th>
                <th scope="col">Public</th>
                <th scope="col">Link to</th>
                <th scope="col">Access requests</th>
                <th scope="col">{t("common.actions")}</th>
            </tr>
            </thead>
            <tbody>
            {data?.map((solution, index) => {
                    return (
                        <tr key={solution.id}>
                            <td>{solution.title}</td>
                            <td>
                                <input type="checkbox" className={"form-check"} disabled checked={!solution.private}/>
                            </td>
                            <td>
                                <a target={"_blank"} href={solution.link}>{solution.link.slice(0, 20)}{solution.link.length > 20 ? "..." : ""}</a>
                            </td>
                            <td>
                                <AccessDetail accessDetails={solution.accessDetails}/>
                            </td>
                            <td>
                                <div className={"d-flex"}>

                                    <div onClick={() => toUpdate(solution.id)} className={"mr-1 icon-wrapper"}>
                                        <img className={"icon"}
                                             alt={"Update"}
                                             src={edit}/>
                                    </div>

                                    <ActionConfirmationAlert action={() => {
                                        onDelete(solution.id)
                                    }} displayText={t("common.deleteUSure")}
                                                             triggerElement={<div className={"icon-wrapper"}>
                                                                 <img
                                                                     className={"icon ms-4"}
                                                                     alt={"Delete"}
                                                                     src={removeIcon}/></div>}/>
                                </div>
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

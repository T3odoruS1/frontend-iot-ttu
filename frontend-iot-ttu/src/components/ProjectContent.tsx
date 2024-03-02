import {FC} from "react";
import {Col, Row} from "react-bootstrap";
import {TitleAllCaps, TitleColors} from "./common/TitleAllCaps";
import {useTranslation} from "react-i18next";

interface IProps {
    title: string;
    body: string;
    year: number;
    projectVolume: number;
    projectManager: string;
}

export const ProjectContent: FC<IProps> = (project: IProps) => {
    const {t} = useTranslation();

    return (
        <div className={"w-100"}>

            <div className={"pb-2 d-flex flex-sm-row flex-column"}>
                <h4 className={"some-gray mt-1"}>{t("common.year")}: </h4>
                <h4 className={"header-pink mt-1 mx-sm-4 mx-1"}>{project.year}</h4>
                <h4 className={"some-gray ml-4 mt-1"}>{t("common.projectManager")}: </h4>
                <h4 className={"header-pink mt-1 mx-sm-4 mx-1"}>{project.projectManager}</h4>
                <h4 className={"some-gray mt-1"}>{t("common.volume")}: </h4>
                <h4 className={"header-pink mt-1 mx-sm-4 mx-1"}>{project.projectVolume}</h4>
            </div>

            <div className={"pt-2 pb-4"}>
                <TitleAllCaps color={TitleColors.purple} className="">{project.title}</TitleAllCaps>
            </div>
            <hr/>
            <div className="w-100 pt-4">
                <div className="quill">
                    <div className="result-div ql-container ql-snow" style={{position: "relative"}}>
                        <div
                            className="ql-editor"
                            dangerouslySetInnerHTML={{__html: project.body}}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
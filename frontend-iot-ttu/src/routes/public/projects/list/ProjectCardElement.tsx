import {FC} from "react";
import {IProject} from "../../../../dto/project/IProject";
import {Col} from "react-bootstrap";
import {getTopicAreasAsStr} from "../../../../utils/utils";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface IProps{
    project: IProject
}

export const ProjectCardElement: FC<IProps> = ({project}) => {
    const navigate = useNavigate();

    const navigateToDetails = () => {
        navigate(`./${project.id}`);
    }

    const {t} = useTranslation();


    return (
        <Col md={12} className={"clickable-pointer mb-4"} onClick={navigateToDetails}>
            <div className={"mt-5 project-card gradient-border w-100"}>
                <p className={"text-small-gray"}>{t("common.title")}</p>
                <h3 className="m-0 header-purple">{project.title}</h3>
                <p className={"text-small-gray mt-4"}>{t("common.topicAreas")}</p>
                <h5 className={"header-pink mt-1"}>{getTopicAreasAsStr(project.topicAreas)}</h5>
                <p className={"text-small-gray mt-4"}>{t("common.year")}</p>
                <h5 className={"header-pink mt-1"}>{project.year}</h5>
                <p className={"text-small-gray mt-4"}>{t("common.projectManager")}</p>
                <h5 className={"header-pink mt-1"}>{project.projectManager}</h5>
                <p className={"text-small-gray mt-4"}>{t("common.volume")}</p>
                <h5 className={"header-pink mt-1"}>{project.projectVolume}</h5>
            </div>
        </Col>
    );
};
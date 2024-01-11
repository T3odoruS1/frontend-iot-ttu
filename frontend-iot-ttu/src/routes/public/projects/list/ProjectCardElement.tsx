import {FC} from "react";
import {IProject} from "../../../../dto/project/IProject";
import {Col} from "react-bootstrap";
import {getTopicAreasAsStr} from "../../../../utils/utils";
import {useNavigate} from "react-router-dom";

interface IProps{
    project: IProject
}

export const ProjectCardElement: FC<IProps> = ({project}) => {
    const navigate = useNavigate();

    const navigateToDetails = () => {
        navigate(`./${project.id}`);
    }


    return (
        <Col md={6} className={"clickable-pointer"} onClick={navigateToDetails}>
            <div className={"mt-5 project-card gradient-border w-100"}>
                <p className={"text-small-gray"}>Title</p>
                <h3 className="m-0 header-purple">{project.title}</h3>
                <p className={"text-small-gray mt-4"}>Topic areas</p>
                <h5 className={"header-pink mt-1"}>{getTopicAreasAsStr(project.topicAreas)}</h5>
                <p className={"text-small-gray mt-4"}>Year</p>
                <h5 className={"header-pink mt-1"}>{project.year}</h5>
                <p className={"text-small-gray mt-4"}>Project manager</p>
                <h5 className={"header-pink mt-1"}>{project.projectManager}</h5>
                <p className={"text-small-gray mt-4"}>Volume</p>
                <h5 className={"header-pink mt-1"}>{project.projectVolume}</h5>
            </div>
        </Col>
    );
};
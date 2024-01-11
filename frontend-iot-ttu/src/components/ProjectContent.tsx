import {IProject} from "../dto/project/IProject";
import React, {FC} from "react";
import {Col, Row} from "react-bootstrap";
import {getTopicAreasAsStr} from "../utils/utils";
import {TitleAllCaps, TitleColors} from "./common/TitleAllCaps";

interface IProps {
    project: IProject
}

export const ProjectContent: FC<IProps> = ({project}) => {

    return (
        <div className={"w-100"}>
            <Row className={"w-100"}>
                <Col md={8}>
                    <div className={"p-2"}>
                        <TitleAllCaps color={TitleColors.purple} className="">{project.title}</TitleAllCaps>
                    </div>
                </Col>
                <Col md={4}>
                    <div className={"p-2"}>
                        <p className={"text-small-gray"}>Topic areas</p>
                        <h5 className={"header-pink mt-1"}>{getTopicAreasAsStr(project.topicAreas)}</h5>
                        <p className={"text-small-gray mt-4"}>Year</p>
                        <h5 className={"header-pink mt-1"}>{project.year}</h5>
                        <p className={"text-small-gray mt-4"}>Project manager</p>
                        <h5 className={"header-pink mt-1"}>{project.projectManager}</h5>
                        <p className={"text-small-gray mt-4"}>Volume</p>
                        <h5 className={"header-pink mt-1"}>{project.projectVolume}</h5>
                    </div>
                </Col>
            </Row>

            <div className="w-100">
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
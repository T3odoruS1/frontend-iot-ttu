import {useTranslation} from "react-i18next";
import capitalize from "../utils/capitalize";
import {ITopicAreaGet} from "../dto/topicarea/ITopicAreaGet";
import SubHeadingPurple from "./common/SubheadingPurple";
import {Col, Row} from "react-bootstrap";
import DatePink from "./common/DatePink";
import {TitleAllCaps, TitleColors} from "./common/TitleAllCaps";
import React from "react";
import {getTopicAreasAsStr} from "../utils/utils";

interface IProps {
    title: string;
    image: string;
    createdAt: string;
    author: string;
    content: string;
    topicAreas: ITopicAreaGet[];
}

const NewsContentAdm = (props: IProps) => {
    const [t] = useTranslation();

    const joinTopicAreas = (): string => {
        return props.topicAreas.map(area => area.name).join(", ");
    }
    return (
        <div className="w-100">
            <Row className="w-100 mb-5">

                <Col md="9">
                    <img
                        src={props.image}
                        alt="Poster_image"
                        className="content_image max-w"
                    />
                </Col>
                <Col md="3" className={"mt-md-0 mt-2"}>
                    <p className={"text-small-gray"}>{t("common.date")}</p>
                    <h5 className={"header-pink mt-1"}>{props.createdAt}</h5>
                    <p className={"text-small-gray"}>{t("common.author")}</p>
                    <h5 className={"header-pink mt-1"}>{props.author}</h5>
                    <p className={"text-small-gray"}>{t("common.topicAreas")}</p>
                    <h5 className={"header-pink mt-1"}>{getTopicAreasAsStr(props.topicAreas)}</h5>
                </Col>

            </Row>
            <div className="w-100 mt-2">
                <div className="quill">
                    <div className="result-div ql-container ql-snow" style={{position: "relative"}}>
                        <div
                            className="ql-editor"
                            dangerouslySetInnerHTML={{__html: props.content}}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsContentAdm;

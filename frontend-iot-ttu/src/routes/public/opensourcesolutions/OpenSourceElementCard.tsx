import SubHeadingPurple from "../../../components/common/SubheadingPurple";
import {Card} from "react-bootstrap";
import React, {FC} from "react";
import {IOpenSourceSolution} from "../../../dto/IOpenSourceSolution";

export const OpenSourceElementCard: FC<{ data: IOpenSourceSolution }> = ({data}) => {
    return (
        <Card className='git-style-card p-4'>
            <SubHeadingPurple>{data.title}</SubHeadingPurple>
            <p>{data.description}</p>
            <div className={"text-pink-main"}>{data.topicAreas.flatMap(v => v.name).join(", ")}</div>
        </Card>
    );
};
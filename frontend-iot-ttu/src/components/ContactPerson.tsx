import {string} from "yup";
import SubHeadingPurple from "./common/SubheadingPurple";
import React from "react";

interface IProps {
    name: string;
    body: string;
}

export const ContactPerson = (props: IProps) => {
    return (
        <div className={"contact-person w-100"}>
            <SubHeadingPurple>{props.name}</SubHeadingPurple>
            <div className={"contact-hr"}>

            </div>
            <div className={" mt-2 contact-person-data"}>
                <div className="quill">
                    <div className="result-div ql-container ql-snow" style={{position: "relative"}}>
                        <div
                            className="ql-editor"
                            dangerouslySetInnerHTML={{__html: props.body}}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
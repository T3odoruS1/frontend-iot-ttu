import {IFeedPagePost} from "../../../../dto/feedpage/post/IFeedPagePost";
import {useTranslation} from "react-i18next";
import {FC, ReactElement, useState} from "react";
import SubHeadingPurple from "../../../../components/common/SubheadingPurple";
import KeyVal from "../../../../components/structure/KeyVal";
import {useCollapse} from "react-collapsed";
import dropdownIcon from "../../../../assets/iconpack/Dropdown Arrow Icon.svg";

interface IProps {
    post: IFeedPagePost,
    additionalElements?: ReactElement;
}

const FeedPagePostElement: FC<IProps> = ({post}) => {
    const {t} = useTranslation();
    return <div className="w-100 p-4 mb-5 ttu-card">
        <h3>{post.title}</h3>
        <KeyVal label={t("common.createdAt") + ":"} value={new Date(post.createdAt ?? "").toLocaleDateString()}/>

        <hr/>
        <div className="w-100 text-dark pe-5">
            <div className="quill">
                <div className="result-div ql-container ql-snow" style={{position: "relative"}}>
                    <div
                        className="ql-editor"
                        dangerouslySetInnerHTML={{__html: post.body}}
                    />
                </div>
            </div>
        </div>
    </div>
}

export default FeedPagePostElement;
import { IFeedPagePost } from "../../../../dto/feedpage/post/IFeedPagePost";
import {useTranslation} from "react-i18next";
import {FC, ReactElement} from "react";

interface IProps{
    post: IFeedPagePost,
    additionalElements?: ReactElement;
}

const FeedPagePostElement: FC<IProps> = ({post, additionalElements}) => {
    const {t} = useTranslation();
    return <div className="notification w-100">
        <div className="notiglow"></div>
        <div className="notiborderglow"></div>
        <div className={"d-flex"}>
            <h1 className="notititle header-pink all-caps">{post.title}</h1>
            {additionalElements}
        </div>
        <div className="notibody">
            <div>
                <p>{t("common.createdAt")}: {new Date(post.createdAt ?? "").toLocaleDateString()}</p>
            </div>
            <div className="w-100 text-dark">
                <div className="quill">
                    <div className="result-div ql-container ql-snow" style={{ position: "relative" }}>
                        <div
                            className="ql-editor"
                            dangerouslySetInnerHTML={{ __html: post.body }}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default FeedPagePostElement;
import { TitleAllCaps } from "../../../../components/common/TitleAllCaps";
import { IFeedPagePost } from "../../../../dto/feedpage/post/IFeedPagePost";



const FeedPagePostElement = (post: IFeedPagePost) => {

    return <div className="notification w-100">
        <div className="notiglow"></div>
        <div className="notiborderglow"></div>
        <h1 className="notititle header-pink all-caps">{post.title}</h1>
        <div className="notibody">
            <div>
                <p>Created: {post.createdAt}</p>
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
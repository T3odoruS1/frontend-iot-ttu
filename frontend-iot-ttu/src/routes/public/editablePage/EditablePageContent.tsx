import {IPageContent} from "../../../dto/pageContent/IPageContent";
import {dummyPage} from "../../../assets/loremIpsumDummy";
import PageTitle from "../../../components/common/PageTitle";
import pageTitle from "../../../components/common/PageTitle";

interface IProps{
    pageIdentifier: string;
}

export const EditablePageContent = (props: IProps) => {

    const content: IPageContent = {
        pageIdentifier: props.pageIdentifier,
        pageTitle: "Some title",
        body: dummyPage
    }
    return (
        <>
            <PageTitle>{content.pageTitle}</PageTitle>
            <div className="w-100">
                <div className="quill">
                    <div className="result-div ql-container ql-snow" style={{position: "relative"}}>
                        <div
                            className="ql-editor"
                            dangerouslySetInnerHTML={{__html: content.body}}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
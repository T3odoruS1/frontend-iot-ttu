import {IPageContent} from "../../../dto/pageContent/IPageContent";
import {dummyPage} from "../../../assets/loremIpsumDummy";
import PageTitle from "../../../components/common/PageTitle";
import pageTitle from "../../../components/common/PageTitle";
import usePageContent from "../../../hooks/usePageContent";
import {Loader} from "../../../components/Loader";

interface IProps {
    pageIdentifier: string
    showTitle: boolean;
}

export const EditablePageContent = (props: IProps) => {

    const {pageContent, pending, error} = usePageContent(props.pageIdentifier);

    const content: IPageContent = {
        pageIdentifier: props.pageIdentifier,
        title: "Some title",
        body: dummyPage
    }

    if (pageContent?.body === null || pageContent?.title === null) {
        return <><PageTitle>No content found</PageTitle></>
    } else {
        return (
            <>
                {pending && <Loader/>}
                {props.showTitle && <div className={"mb-5"}>
                    <PageTitle>{pageContent?.title}</PageTitle>
                </div>}

                <div className="w-100">
                    <div className="quill">
                        {pageContent?.body &&
                            <div className="result-div ql-container ql-snow" style={{position: "relative"}}>
                                <div
                                    className="ql-editor"
                                    dangerouslySetInnerHTML={{__html: pageContent!.body}}
                                />
                            </div>}

                    </div>
                </div>
            </>
        );
    }

};
import {IPageContent} from "../../../dto/pageContent/IPageContent";
import PageTitle from "../../../components/common/PageTitle";
import {Loader} from "../../../components/Loader";
import {PageContentService} from "../../../services/PageContentService";
import useFetch from "../../../hooks/useFetch";
import i18n from "i18next";

interface IProps {
    pageIdentifier: string
    showTitle: boolean;
}

export const EditablePageContent = (props: IProps) => {
    const service = new PageContentService();
    const {data: pageContent, pending, error} = useFetch<IPageContent>(service.getContent, [props.pageIdentifier, i18n.language]);


    if (!pending && error) {
        return <><PageTitle>No content found</PageTitle></>
    } else {
        return (
            <>
                {pending && <Loader/>}
                {props.showTitle && <div className={"mb-2"}>
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
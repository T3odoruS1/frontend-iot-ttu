import {IPageContent} from "../../../dto/pageContent/IPageContent";
import PageTitle from "../../../components/common/PageTitle";
import SubHeadingPurple from "../../../components/common/SubheadingPurple";
import InputControl from "../../../components/form/InputControl";
import ReactQuill from "react-quill";
import {useForm} from "react-hook-form";
import {dummyPage} from "../../../assets/loremIpsumDummy";
import {IPageContentMultilang} from "../../../dto/pageContent/IPageContentMultilang";

interface IProps {
    pageIdentifier: string;
}

export const EditablePageEditor = (props: IProps) => {

    const {register} = useForm()
    const content: IPageContentMultilang = {
        pageIdentifier: props.pageIdentifier,
        pageTitle: [
            {
                value: "Some title",
                culture: "et"
            },{
                value: "Some title",
                culture: "et"
            }
        ],
        body: [
            {
                value: dummyPage,
                culture: "et"
            },{
                value: dummyPage,
                culture: "et"
            }
        ]
    }

    return (
        <><PageTitle>For page: {props.pageIdentifier}</PageTitle>
            <form>
                <SubHeadingPurple>Titles</SubHeadingPurple>
                <div className={"mt-2"}>
                    <InputControl
                        register={register}
                        name={"title1"}
                        label={"Title 1"}
                    />
                </div>
                <div className={"mt-2"}>
                    <InputControl
                        register={register}
                        name={"title1"}
                        label={"Title 1"}
                    />
                </div>

                <SubHeadingPurple>Content</SubHeadingPurple>

                <div className={"mt-2"}>
                    <ReactQuill/>
                </div>
                <div className={"mt-2"}>
                    <ReactQuill/>
                </div>
            </form>
        </>
    );
};
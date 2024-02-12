import {IProjectOutput} from "../../../../dto/project/IProjectOutput";
import {ITopicAreaGet, ITopicAreaGetMultilang} from "../../../../dto/topicarea/ITopicAreaGet";
import {ProjectContent} from "../../../../components/ProjectContent";
import {IProject} from "../../../../dto/project/IProject";
import i18n from "i18next";

interface IProps {
    formValues: IProjectOutput;
}


export const ProjectPreview = (props: IProps) => {

    const getContent = (value: string | undefined, def: string) => {
        if (value !== undefined && value.length > 0) {
            return value;
        }
        return def;
    }


    return (
        <div className={"d-inline-flex justify-content-center align-items-center w-100"}>
            <ProjectContent year={props.formValues.year}
                            body={
                                i18n.language === "en"
                                    ? (getContent(props.formValues?.body?.at(0)?.value, "No title"))
                                    : (getContent(props.formValues?.body?.at(1)?.value, "Pealkirja ei ole"))
                            }
                            projectManager={props.formValues.projectManager}
                            projectVolume={props.formValues.projectVolume}
                            title={i18n.language === "et"
                                ? (props.formValues?.title?.at(1)?.value ?? "No content")
                                : (props.formValues?.title?.at(0)?.value ?? "Sisu ei ole")}
            />
        </div>
    );
};
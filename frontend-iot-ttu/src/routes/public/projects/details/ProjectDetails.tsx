import {useNavigate, useParams} from "react-router-dom";
import ErrorPage from "../../../ErrorPage";
import NavigationButton from "../../../../components/common/NavigationButton";
import {Loader} from "../../../../components/Loader";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";
import {ProjectContent} from "../../../../components/ProjectContent";
import {useTranslation} from "react-i18next";
import NotFoundPage from "../../../NotFoundPage";
import {ProjectService} from "../../../../services/ProjectService";
import useFetch from "../../../../hooks/useFetch";
import {IProject} from "../../../../dto/project/IProject";
import i18n from "i18next";
import {formatCurrency} from "../../../../utils/roundNumber";
import LayoutMulticolour from "../../../../components/structure/LayoutMulticolour";
import {TitleAllCaps, TitleColors} from "../../../../components/common/TitleAllCaps";


const ProjectDetails = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const {t} = useTranslation();
    const projectService = new ProjectService();
    const {data: project, pending, error} = useFetch<IProject>(projectService.getById, [i18n.language, id ?? ""]);
    const onContactUsClick = () => {
        if (project) {
            navigate(`../../contact?fromProject=${project.id}`)
        } else {
            navigate(`../../contact?fromNews`)
        }
    }


    if (error == "400" || error == "404") return <NotFoundPage/>
    if (error == "500") return <ErrorPage/>;

    if (!error) return (<LayoutMulticolour
        headerContent={<>
            <div className={"mb-4"}>
                {pending ?? <Loader/>}
                <NavigationButton to={"../"}>Go back</NavigationButton>
            </div>
            <div className={"pb-2 d-flex flex-sm-row flex-column"}>
                <h4 className={"some-gray mt-1"}>{t("common.year")}: </h4>
                <h4 className={"header-pink mt-1 mx-sm-4 mx-1"}>{project?.year}</h4>
                <h4 className={"some-gray ml-4 mt-1"}>{t("common.projectManager")}: </h4>
                <h4 className={"header-pink mt-1 mx-sm-4 mx-1"}>{project?.projectManager}</h4>
                <h4 className={"some-gray mt-1"}>{t("common.volume")}: </h4>
                <h4 className={"header-pink mt-1 mx-sm-4 mx-1"}>{project?.projectVolume}</h4>
            </div>
            <div className={"pt-2 pb-4"}>
                <TitleAllCaps color={TitleColors.purple} className="">{project?.title}</TitleAllCaps>
            </div>
        </>
        }
        bodyContent={
            <div className="w-100 pt-4">
                <div className="quill">
                    <div className="result-div ql-container ql-snow" style={{position: "relative"}}>
                        <div
                            className="ql-editor"
                            dangerouslySetInnerHTML={{__html: project?.body ?? ""}}
                        />
                    </div>
                </div>
            </div>
        }/>);
    return <></>
}

export default ProjectDetails;
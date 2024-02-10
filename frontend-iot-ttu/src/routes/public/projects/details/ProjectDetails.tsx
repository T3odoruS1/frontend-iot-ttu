
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



const ProjectDetails = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const {t} = useTranslation();
    const projectService = new ProjectService();
    const {data: project, pending, error} = useFetch<IProject>(projectService.getById, [i18n.language, id ?? ""]);
    const onContactUsClick = () => {
        navigate("../../contact")
    }


    if(error == "400" || error == "404") return <NotFoundPage/>
    if(error == "500") return <ErrorPage/>;

    if(! error) return (
        <div>
            <div className={"mb-4"}>
                <NavigationButton to={"../"}>Go back</NavigationButton>
            </div>

            {pending ? <Loader/> : (<ProjectContent
                body={project?.body!}
                projectManager={project?.projectManager!}
                projectVolume={project?.projectVolume!}
                title={project?.title!}
                year={project?.year!}/>)}

            <div className={"mt-5"}>
                <ButtonPrimary onClick={onContactUsClick}>{t("public.news.contact")}</ButtonPrimary>
            </div>

        </div>
    );
    return <></>
}

export default ProjectDetails;
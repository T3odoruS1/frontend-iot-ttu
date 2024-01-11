import {getTopicAreasAsStr} from "../../../../utils/utils";
import useProject from "../../../../hooks/useProject";
import {FC, useEffect} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import ErrorPage from "../../../ErrorPage";
import NavigationButton from "../../../../components/common/NavigationButton";
import {Loader} from "../../../../components/Loader";
import NewsContent from "../../../../components/NewsContent";
import ButtonPrimary from "../../../../components/common/ButtonPrimary";
import {ProjectContent} from "../../../../components/ProjectContent";
import {useTranslation} from "react-i18next";



const ProjectDetails = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {project, pending, error} = useProject(id ?? "");
    const onContactUsClick = () => {
        navigate("../../contact")
    }

    if (error) return <ErrorPage></ErrorPage>;

    if(! error) return (
        <div>
            <div className={"mb-4"}>
                <NavigationButton to={"../"}>Go back</NavigationButton>
            </div>

            {pending ? <Loader/> : (<ProjectContent project={project!}/>)}

            <div className={"mt-5"}>
                <ButtonPrimary onClick={onContactUsClick}>{t("public.news.contact")}</ButtonPrimary>
            </div>

        </div>
    );
    return <></>
}

export default ProjectDetails;
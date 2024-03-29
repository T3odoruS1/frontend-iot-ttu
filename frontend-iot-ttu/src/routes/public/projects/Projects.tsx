import {Outlet} from "react-router-dom";
import {useTranslation} from "react-i18next";
import useDocumentTitle from "../../../hooks/useDocumentTitle";

const Projects = () => {
  const {t} = useTranslation()
  useDocumentTitle(t("titles.projects"))
  return <><Outlet/></>
}

export default Projects;
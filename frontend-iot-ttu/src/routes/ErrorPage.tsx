import {useTranslation} from "react-i18next";
import SubHeadingPurple from "../components/common/SubheadingPurple";

const ErrorPage = () => {
  const {t} = useTranslation();

  return <div className={"d-flex flex-column align-items-center justify-content-center h-100"}>
    <br/>
    <br/>
    <br/>
    <br/>
    <h1 className={"oops"}>Oops</h1>
    <br/>
    <SubHeadingPurple>{t('errorPage.somethingWentWrong')}</SubHeadingPurple>
  </div>
}

export default ErrorPage;
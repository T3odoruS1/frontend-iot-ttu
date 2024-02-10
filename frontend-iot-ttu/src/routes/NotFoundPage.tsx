import SubHeadingPurple from "../components/common/SubheadingPurple";
import {useTranslation} from "react-i18next";
import Header from "../components/header/public/Header";
import Footer from "../components/Footer";

const NotFoundPage = () => {
    const {t} = useTranslation();

    return (<div>
            <div className={"d-flex flex-column align-items-center justify-content-center h-100"}>
                <br/>
                <br/>
                <br/>
                <br/>
                <h1 className={"oops"}>Oops</h1>
                <br/>
                <SubHeadingPurple>{t('errorPage.notFound')}</SubHeadingPurple>
            </div>
        </div>
    );
};

export default NotFoundPage;
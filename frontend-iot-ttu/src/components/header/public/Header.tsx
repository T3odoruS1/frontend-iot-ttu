import {Link, useLocation} from "react-router-dom";
import TalTechSVG from "../TalTechSVG";
import HeaderNavLink from "../HeaderNavLink";
import LanguageSwitcher from "../LanguageSwitcher";
import i18n from "i18next";
import {useTranslation} from "react-i18next";
import {DesktopHeaderBody} from "../DesktopHeaderBody";
import {useMediaQuery} from "react-responsive";
import {MobileHeaderBody} from "../MobileHeaderBody";
import React from "react";

const Header = () => {
    const {t} = useTranslation();
    const location = useLocation();

    const elementIsActive = (path: string) => {
        return path === location.pathname
    }

    const routes = [
        <HeaderNavLink
            to={`/${i18n.language}`}
            title={t("public.header.home")}
        />,
        <HeaderNavLink
            to={`/${i18n.language}/news`}
            title={t("public.header.news")}
        />,
        <HeaderNavLink
            to={`/${i18n.language}/technology`}
            title={t("public.header.technology")}
        />,
        <HeaderNavLink
            to={`/${i18n.language}/projects`}
            title={t("public.header.projects")}
        />,
        <HeaderNavLink
            to={`/${i18n.language}/opensourcesolutions`}
            title={t("public.header.openSourceSolutions")}
        />,
        <HeaderNavLink
            to={`/${i18n.language}/contact`}
            title={t('public.header.contactUs')}/>
    ]

    const Header = (): JSX.Element => {
        const isMobile = useMediaQuery({maxWidth: 991});
        return isMobile ?
            <MobileHeaderBody routes={routes} logoElement={<TalTechSVG/>}/> :
            <DesktopHeaderBody routes={routes} logoElement={<TalTechSVG/>}/>;
    }

    return (
        <>
            <Header/>
        </>
    );
};

export default Header;

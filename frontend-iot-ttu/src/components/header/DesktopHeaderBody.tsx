import {Link} from "react-router-dom";
import i18n from "i18next";
import TalTechSVG from "./TalTechSVG";
import HeaderNavLink from "./HeaderNavLink";
import LanguageSwitcher from "../LanguageSwitcher";
import {useTranslation} from "react-i18next";
import React, {FC} from "react";

interface IProps {
    routes: JSX.Element[],
    logoElement: JSX.Element
}

export const DesktopHeaderBody: React.FC<IProps> = (props) => {
    const { t } = useTranslation();

    return (
        <nav className=" sticky-top top-gradient navbar navbar-expand-lg navbar-light bg-light pb-0">
            <div className={"container-fluid"}>
                <Link className="navbar-brand mr-auto pb-0" to={`/${i18n.language}`}>
                    {props.logoElement}
                </Link>

                <div
                    className="navbar-placement">
                    <ul className="navbar-nav header-container mb-2 mb-lg-0">
                        {props.routes.map(el => {
                            return el;
                        })}
                        <li key={100}>
                            <LanguageSwitcher toLeft={true}/>
                            <Link className="nav-link top-text under-language" to={`/${i18n.language}/contact`}>
                                {t('public.header.contactUs')}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
import {Link} from "react-router-dom";
import i18n from "i18next";
import TalTechSVG from "./TalTechSVG";
import HeaderNavLink from "./HeaderNavLink";
import LanguageSwitcher from "../LanguageSwitcher";
import {useTranslation} from "react-i18next";
import React, {FC, useContext} from "react";
import {JwtContext} from "../../routes/Root";

interface IProps {
    routes: JSX.Element[],
    logoElement: JSX.Element
}

export const DesktopHeaderBody: React.FC<IProps> = (props) => {

    const {t} = useTranslation();

    return (
        <nav className=" sticky-top top-gradient navbar navbar-expand-lg navbar-light bg-light pb-0">
            <div className={"container-fluid"}>
                <Link key={Math.random()} className="navbar-brand mr-auto pb-0" to={`/${i18n.language}`}>
                    {props.logoElement}
                </Link>

                <div
                    className="navbar-placement">
                    <ul key={Math.random()} className="navbar-nav header-container mb-2 mb-lg-0">
                        {props.routes.map(el => {
                            return <div key={Math.random()} className={"nav-item header-item"}>{el}</div>;
                        })}
                        <li key={Math.random()}>
                            <LanguageSwitcher toLeft={true}/>
                            <Link key={Math.random()} className="nav-link top-text under-language"
                                  to={`./contact`}>
                                {t('public.header.contactUs')}
                            </Link>
                        </li>

                    </ul>

                </div>

            </div>
        </nav>
    );
};
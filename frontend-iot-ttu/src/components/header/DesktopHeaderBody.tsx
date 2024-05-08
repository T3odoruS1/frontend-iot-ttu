import {Link} from "react-router-dom";
import i18n from "i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import {useTranslation} from "react-i18next";
import React, {Fragment} from "react";
import HeaderNavLink from "./HeaderNavLink";

interface IProps {
    routes: JSX.Element[],
    logoElement: JSX.Element
}

export const DesktopHeaderBody: React.FC<IProps> = (props) => {

    const {t} = useTranslation();

    return (
        <nav className="sticky-top top-gradient navbar navbar-expand-lg navbar-light bg-light pb-0">
            <div className={"container-fluid"}>
                <Link key={Math.random()} aria-label={"Home"} className="navbar-brand mr-auto pb-0" to={`/${i18n.language}`}>
                    {props.logoElement}
                </Link>

                <div
                    className="navbar-placement">
                    <div key={Math.random()} className="navbar-nav header-container mb-2 mb-lg-0">
                        {props.routes.map((el, index) => {
                            if(index !== props.routes.length - 1){
                                return <Fragment key={Math.random()}>{el}</Fragment>;
                            }else {
                                return <div key={Math.random()}>
                                    <LanguageSwitcher toLeft={true}/>
                                    <div className={"under-language"}>
                                        {el}
                                    </div>

                                </div>
                            }

                        })}


                    </div>

                </div>

            </div>
        </nav>
    );
};
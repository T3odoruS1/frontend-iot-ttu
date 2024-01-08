import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import i18n from "i18next";
import hamburgerIcon from '../../assets/hamburger.png';
import LanguageSwitcher from "../LanguageSwitcher";
import { CSSTransition } from "react-transition-group";



interface IProps {
    routes: JSX.Element[],
    logoElement: JSX.Element
}

export const MobileHeaderBody: React.FC<IProps> = (props) => {
    const [expanded, setExpanded] = useState(false);
    const toggleExpand = () => {
        setExpanded(!expanded);
    }


    return (
        <nav className="top-gradient navbar navbar-expand-lg navbar-light bg-light pb-0">
            <div className={"d-flex flex-column w-100"}>
                <div className={"responsive-header"}>
                    <Link className="navbar-brand mr-auto pb-0 m-2" to={`/${i18n.language}`}>
                        {props.logoElement}
                    </Link>
                    <div className={"my-auto mx-4"}>
                        <button className={"hamburger-button mb-1 h-25"} onClick={toggleExpand} type={"button"}>
                            <img src={hamburgerIcon} className={"hamburger"} alt={"toggle menu"}/>
                        </button>
                    </div>
                </div>


                {expanded &&
                    <ul className={`navbar-nav menu`}>
                        {props.routes.map((route, index) => (
                            <li className="nav-item m-2" key={index}>
                                {route}
                            </li>
                        ))}
                        <LanguageSwitcher/>
                    </ul>
                }
            </div>
        </nav>
    );
};
import {useTranslation} from "react-i18next";
import React, {CSSProperties, useState} from "react";
import TalTechSVG from "./TalTechSVG";
import {Link} from "react-router-dom";
import i18n from "i18next";
import hamburgerIcon from '../../assets/hamburger.png';

import {Transition, TransitionStatus} from 'react-transition-group';
import {TransitionProps} from "react-transition-group/Transition";
import LanguageSwitcher from "../LanguageSwitcher";




interface IProps {
    routes: JSX.Element[],
    logoElement: JSX.Element
}

export const MobileHeaderBody: React.FC<IProps> = (props) => {
    const {t} = useTranslation();
    const [expanded, setExpanded] = useState(false);
    const duration = 300;
    const toggleExpand = () => {
        setExpanded(!expanded);
    }

    const defaultStyle = {
        transition: `height ${duration}ms ease-in-out`,
        height: '0',
    };

    const transitionStyles: { [K in TransitionStatus]?: CSSProperties } = {
        entering: { height: '0' },
        entered:  { height: 'auto' },
        exiting:  { height: 'auto' },
        exited:  { height: '0' },
    };

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
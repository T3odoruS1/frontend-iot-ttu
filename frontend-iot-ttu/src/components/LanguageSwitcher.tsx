/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import i18n from "i18next";
import {bool, boolean} from "yup";


interface IProps{
	toLeft?: boolean;
}

const LanguageSwitcher = (props: IProps) => {
	// const { i18n } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();
	const { lang } = useParams();

	// useEffect(() => {
	// 	i18n.changeLanguage(lang);
	// }, [location]);

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
		const pathSegments = location.pathname.split("/");

		pathSegments[1] = lng;
		
		navigate(pathSegments.join("/"));
	};

	return (
		<div className="">
			{lang === "en" ? (
				<div className={`d-flex ${props.toLeft ? "justify-content-end" : ""}`}>
					<a
						className="language-switcher m-2 selected"
						onClick={() => changeLanguage("en")}>
						ENG
					</a>
					<a
						className="language-switcher m-2"
						onClick={() => changeLanguage("et")}>
						EST
					</a>
				</div>
			):(
				<div className={`d-flex ${props.toLeft ? "justify-content-end": ""}`}>
					<a
						className="language-switcher m-2"
						onClick={() => changeLanguage("en")}>
						ENG
					</a>
					<a
						className="language-switcher m-2 selected"
						onClick={() => changeLanguage("et")}>
						EST
					</a>
				</div>
			)}
			
		</div>
	);
}

export default LanguageSwitcher;

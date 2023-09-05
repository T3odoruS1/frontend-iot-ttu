/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function LanguageSwitcher() {
	const { i18n } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();
	const { lang } = useParams();

	useEffect(() => {

		i18n.changeLanguage(lang);

		// console.log(i18n.language);
	}, [location, i18n, lang]);

	const changeLanguage = (lng: string) => {
		// console.log("Lang: " + lng);
		i18n.changeLanguage(lng);
		const pathSegments = location.pathname.split("/");

		pathSegments[1] = lng;
		
		navigate(pathSegments.join("/"));
	};

	return (
		<div className="">
			{lang === "en" ? (
				<div className="d-flex justify-content-end">
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
				<div className="d-flex justify-content-end">
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

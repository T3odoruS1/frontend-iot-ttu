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
		console.log("Path segments: " + lang);

		i18n.changeLanguage(lang);

		// console.log(i18n.language);
	}, [location, i18n, lang]);

	const changeLanguage = (lng: string) => {
		// console.log("Lang: " + lng);

		const pathSegments = location.pathname.split("/");

		pathSegments[1] = lng;

		navigate(pathSegments.join("/"));
	};

	return (
		<div className="">
			{lang === "eng" ? (
				<div>
					<a
						className="language-switcher m-2 selected"
						onClick={() => changeLanguage("eng")}>
						ENG
					</a>
					<a
						className="language-switcher"
						onClick={() => changeLanguage("est")}>
						EE
					</a>
				</div>
			):(
				<div>
					<a
						className="language-switcher m-2"
						onClick={() => changeLanguage("eng")}>
						EST
					</a>
					<a
						className="language-switcher selected"
						onClick={() => changeLanguage("est")}>
						EST
					</a>
				</div>
			)}
			
		</div>
	);
}

export default LanguageSwitcher;

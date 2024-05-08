/* eslint-disable jsx-a11y/anchor-is-valid */
import {useCallback, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import i18n from "i18next";
// import {bool, boolean} from "yup";
import {useTranslation} from "react-i18next";
import HeaderNavLink from "./HeaderNavLink";


interface IProps{
	toLeft?: boolean;
}

const LanguageSwitcher = (props: IProps) => {
	const { i18n} = useTranslation()
	const navigate = useNavigate();
	const location = useLocation();
	const { lang } = useParams();

	useEffect(() => {
		changeLanguage(lang!);
		// No return function needed here unless you have specific cleanup logic
	}, [lang, i18n]);

	const toLang = (lng: string) => {
		const pathSegments = location.pathname.split("/");
		pathSegments[1] = lng;
		return pathSegments.join("/");
	}

	const changeLanguage = useCallback((lng: string) => {
		if (lng === i18n.language) return; // Prevent unnecessary language changes
		i18n.changeLanguage(lng);
		const pathSegments = location.pathname.split("/");
		pathSegments[1] = lng;
		navigate(pathSegments.join("/"));
	}, [i18n, location.pathname, navigate]);


	return (
		<div className="">

				<div className={`d-flex ${props.toLeft ? "justify-content-end" : ""}`}>
					<HeaderNavLink
						to={toLang("en")}
						title={"ENG"}
						selected={lang === "en"}
					/>
					<HeaderNavLink
						to={toLang("et")}
						title={"EST"}
						selected={lang === "et"}

					/>
				</div>
			
		</div>
	);
}

export default LanguageSwitcher;

import { Link } from "react-router-dom";
import TalTechSVG from "../TalTechSVG";
import HeaderNavLink from "../HeaderNavLink";
import LanguageSwitcher from "../../LanguageSwitcher";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import {DesktopHeaderBody} from "../DesktopHeaderBody";
import {useMediaQuery} from "react-responsive";
import {MobileHeaderBody} from "../MobileHeaderBody";
import React from "react";

const Header = () => {
	const { t } = useTranslation();


	const routes = [
		<HeaderNavLink
			key={1}
			to={`/${i18n.language}`}
			title={t("public.header.home")}
		/>,
		<HeaderNavLink
			key={2}
			to={`/${i18n.language}/news`}
			title={t("public.header.news")}
		/>,
		<HeaderNavLink
			key={3}
			to={`/${i18n.language}/technology`}
			title={t("public.header.technology")}
		/>,
		<HeaderNavLink
			key={4}
			to={`/${i18n.language}/projects`}
			title={t("public.header.projects")}
		/>,
		<HeaderNavLink
			key={5}
			to={`/${i18n.language}/opensourcesolutions`}
			title={t("public.header.openSourceSolutions")}
		/>
	]

	const Header = (): JSX.Element => {
		const isMobile = useMediaQuery({ maxWidth: 991 });
		return isMobile ?
			<MobileHeaderBody routes={routes} logoElement={<TalTechSVG/>} /> :
			<DesktopHeaderBody routes={routes} logoElement={<TalTechSVG/>}/>;
	}

	return (
		<>
			<Header/>
		</>
	);
};

export default Header;

import { useTranslation } from "react-i18next";
import i18n from "i18next";
import HeaderNavLink from "../HeaderNavLink";
import {useMediaQuery} from "react-responsive";
import {MobileHeaderBody} from "../MobileHeaderBody";
import {DesktopHeaderBody} from "../DesktopHeaderBody";
import React from "react";

const AdminHeader = () => {
	const { t } = useTranslation();

	const routes = [
		<HeaderNavLink
			to={`/${i18n.language}`}
			title={t("admin.header.public")}
		/>,
		<HeaderNavLink
			to={`/${i18n.language}/admin/news`}
			title={t("admin.header.news")}
		/>,
		<HeaderNavLink
			to={`/${i18n.language}/admin/technology`}
			title={t("admin.header.technology")}
		/>,
		<HeaderNavLink
			to={`/${i18n.language}/admin/projects`}
			title={t("admin.header.projects")}
		/>,
		<HeaderNavLink
			to={`/${i18n.language}/admin/banners`}
			title={t("admin.header.banners")}
		/>,
		<HeaderNavLink
			to={`/${i18n.language}/admin/users`}
			title={t("admin.header.users")}
		/>,
		<HeaderNavLink
			to={`/${i18n.language}/admin/contact`}
			title={t('public.header.contactUs')}/>
	]

	const Header = (): JSX.Element => {
		const isMobile = useMediaQuery({ maxWidth: 991 });
		return isMobile ?
			<MobileHeaderBody routes={routes} logoElement={<h3 className={"admin-header-title text-white"}>{t("admin.admin")}</h3>} /> :
			<DesktopHeaderBody routes={routes} logoElement={<h3 className={"admin-header-title text-white"}>{t("admin.admin")}</h3>}/>;
	}

	return (
		<>
			<Header/>
		</>
	);
};

export default AdminHeader;

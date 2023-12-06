import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import HeaderNavLink from "./HeaderNavLink";
import LanguageSwitcher from "../LanguageSwitcher";

const AdminHeader = () => {
	const { t } = useTranslation();

	return (
		<>
			<nav className="top-gradient navbar navbar-expand-lg navbar-light bg-light pb-0">
				<div className="container-fluid">
					<Link className="nav-link top-text" to="/admin">
						<h3 className={"admin-header-title"}>Admin panel</h3>
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div
						className="collapse navbar-placement navbar-collapse "
						id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<HeaderNavLink to={`/${i18n.language}`} title={t("admin.header.public")} />
							<HeaderNavLink
								to={`/${i18n.language}/admin/news`}
								title={t("admin.header.news")}
							/>

							<HeaderNavLink
								to={`/${i18n.language}/admin/technology`}
								title={t("admin.header.technology")}
							/>
							<HeaderNavLink
								to={`/${i18n.language}/admin/projects`}
								title={t("admin.header.projects")}
							/>
							<HeaderNavLink
								to={`/${i18n.language}/admin/users`}
								title={t("admin.header.users")}
							/>
							<li>
								<LanguageSwitcher />
								<Link
									className="nav-link top-text under-language"
									to={`/${i18n.language}/admin/openSourceSolutions`}>
									{t("admin.header.openSourceSolutions")}
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default AdminHeader;

import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import HeaderNavLink from "./HeaderNavLink";

const AdminHeader = () => {
	const { t } = useTranslation();

	return (
		<>
			<nav className="top-gradient navbar navbar-expand-lg navbar-light bg-light pb-0 admin-menu">
				<div className="container-fluid">
					<Link className="nav-link top-text" to="/admin">
						<h3>Admin panel</h3>
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
							<HeaderNavLink
								to={`/${i18n.language}/admin/news`}
								title={t("header.news")}
							/>
							
							<HeaderNavLink
								to={`/${i18n.language}/admin/technology`}
								title={t("header.technology")}
							/>
							<HeaderNavLink
								to={`/${i18n.language}/admin/projects`}
								title={t("header.projects")}
							/>
							<HeaderNavLink
								to={`/${i18n.language}/admin/openSourceSolutions`}
								title={t("header.openSourceSolutions")}
							/>
							
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default AdminHeader;

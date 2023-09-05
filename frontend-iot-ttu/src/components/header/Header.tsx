import { Link } from "react-router-dom";
import TalTechSVG from "./TalTechSVG";
import HeaderNavLink from "./HeaderNavLink";
import LanguageSwitcher from "../LanguageSwitcher";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const Header = () => {
	const { t } = useTranslation();
	return (
		<>
			<nav className="top-gradient navbar navbar-expand-lg navbar-light bg-light pb-0">
				<div className="container-fluid">
					<Link className="navbar-brand mr-auto pb-0"  to={`/${i18n.language}`}>
						<TalTechSVG />
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
								to={`/${i18n.language}`}
								title={t("public.header.home")}
							/>
							<HeaderNavLink
								to={`/${i18n.language}/news`}
								title={t("public.header.news")}
							/>
							<HeaderNavLink
								to={`/${i18n.language}/technology`}
								title={t("public.header.technology")}
							/>

							<li className="nav-item dropdown">
								<Link
									className="nav-link dropdown-toggle top-text"
									to={`/${i18n.language}/projects`}
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false">
									{t("public.header.projects")}
								</Link>
								<ul
									className="dropdown-menu dropdown-menu-custom"
									aria-labelledby="navbarDropdown">
									<li>
										<Link className="dropdown-item" to={`/${i18n.language}/projects`}>
											Projekt 1
										</Link>
									</li>
									<li>
										<Link className="dropdown-item" to={`/${i18n.language}/projects`}>
											Projekt 2
										</Link>
									</li>
								</ul>
							</li>

							<li className="nav-item dropdown">
								<Link
									className="nav-link dropdown-toggle top-text"
									to={`/${i18n.language}/opensourcesolutions`}
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false">
									{t("public.header.openSourceSolutions")}
								</Link>
								<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
									<li>
										<Link className="dropdown-item" to={`/${i18n.language}/opensourcesolutions`}>
											Lahendus 1
										</Link>
									</li>
									<li>
										<Link className="dropdown-item" to={`/${i18n.language}/opensourcesolutions`}>
											Lahendus 2
										</Link>
									</li>
								</ul>
							</li>
							<HeaderNavLink
								to={`/${i18n.language}/admin`}
								title={t("public.header.adminPanel")}
							/>
							<li>
								<LanguageSwitcher />
								<Link className="nav-link top-text under-language" to={`/${i18n.language}/contact`}>
								{t('public.header.contactUs')}
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Header;

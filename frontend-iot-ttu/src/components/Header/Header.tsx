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
					<Link className="navbar-brand mr-auto pb-0" to="/">
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
								title={t("header.home")}
							/>
							<HeaderNavLink
								to={`/${i18n.language}/newsDemo`}
								title={t("header.news")}
							/>
							<HeaderNavLink
								to={`/${i18n.language}`}
								title={t("header.technology")}
							/>

							<li className="nav-item dropdown">
								<Link
									className="nav-link dropdown-toggle top-text"
									to={`/${i18n.language}`}
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false">
									{t("header.projects")}
								</Link>
								<ul
									className="dropdown-menu dropdown-menu-custom"
									aria-labelledby="navbarDropdown">
									<li>
										<Link className="dropdown-item" to={`/${i18n.language}`}>
											Projekt 1
										</Link>
									</li>
									<li>
										<Link className="dropdown-item" to={`/${i18n.language}`}>
											Projekt 2
										</Link>
									</li>
								</ul>
							</li>

							<li className="nav-item dropdown">
								<Link
									className="nav-link dropdown-toggle top-text"
									to={`/${i18n.language}`}
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false">
									{t("header.openSourceSolutions")}
								</Link>
								<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
									<li>
										<Link className="dropdown-item" to="#">
											Lahendus 1
										</Link>
									</li>
									<li>
										<Link className="dropdown-item" to="#">
											Lahendus 2
										</Link>
									</li>
								</ul>
							</li>
							<li>
								<LanguageSwitcher />
								<Link className="nav-link top-text under-language" to={"/"}>
								{t('header.contactUs')}
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

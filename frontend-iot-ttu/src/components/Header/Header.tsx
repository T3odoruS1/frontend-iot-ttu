import { Link } from "react-router-dom";
import TalTechSVG from "./TalTechSVG";
import HeaderNavLink from "./HeaderNavLink";

const Header = () => {
	return (
		<>
			<nav className="top-gradient navbar navbar-expand-lg navbar-light bg-light pb-0">
				<div className="container-fluid">
					<Link className="navbar-brand mr-auto pb-0" to="/">
						<TalTechSVG/>
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
					<div className="collapse navbar-placement navbar-collapse " id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<HeaderNavLink to="/" title="Koduleht"/>
							<HeaderNavLink to="/newsDemo" title="Uudised"/>
							<HeaderNavLink to="/" title="Tehnoloogia"/>

							<li className="nav-item dropdown">
								<Link
									className="nav-link dropdown-toggle top-text"
									to="/"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false">
									Projektid
								</Link>
								<ul className="dropdown-menu dropdown-menu-custom" aria-labelledby="navbarDropdown">
									<li>
										<Link className="dropdown-item" to="/">
											Projekt 1
										</Link>
									</li>
									<li>
										<Link className="dropdown-item" to="/">
											Projekt 2
										</Link>
									</li>
								</ul>
							</li>
							
							<li className="nav-item dropdown">
								<Link
									className="nav-link dropdown-toggle top-text"
									to="/"
									id="navbarDropdown"
									role="button"
									data-bs-toggle="dropdown"
									aria-expanded="false">
									Vabavaralised lahendused
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
							<HeaderNavLink to="/" title="Võta ühendust"/>

						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Header;

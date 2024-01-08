import {Outlet, useLocation} from "react-router-dom";
import Header from "../../components/header/public/Header";
import Footer from "../../components/Footer";
import {useEffect} from "react";

const Public = () => {
	const location = useLocation();
	useEffect(() => {
		console.log(location.pathname);
	}, [location]);

	const isHomePage = () => {
		return location.pathname === "/et" || location.pathname === "/en";
	}
	return (
		<>
			<Header />
			{isHomePage() ? (
				<main className={"home-page-main"}>
				<div className="root-div">
					<Outlet />
				</div>
			</main>) :
				<main>
				<div className="root-div">
					<Outlet />
				</div>
			</main>}

			<Footer />
		</>
	);
};

export default Public;

import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";

const Public = () => {
	return (
		<>
			<Header />
			<main>
				<div className="root-div">
				<Outlet />
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Public;

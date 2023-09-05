import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/Footer";

const Public = () => {
	return (
		<>
			<Header />
			<div className="m-5">
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

export default Public;

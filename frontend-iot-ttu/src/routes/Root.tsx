import Footer from "../components/Footer";
import Header from "../components/head/Header";
import { Outlet, useNavigate } from "react-router-dom";


const Root = () => {
	return (
		<>
			<Header />
			<script src="http://localhost:8097"></script>
			<script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-beta1/js/bootstrap.bundle.min.js"></script>
			<main>
			<Outlet/>
			</main>
			<Footer />
		</>
	);
};

export default Root;

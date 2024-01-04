import { useEffect } from "react";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";


const Root = () => {
	const {lang} = useParams();
	const navigate = useNavigate();
	const langs = ["en", "et"];


	const location = useLocation();

	// useEffect(() => {
	// 	window.scrollTo({top: 0, left: 0, behavior: "auto"});
	// }, [location]);

	useEffect(() => {
		function isSafari() {
			var ua = navigator.userAgent.toLowerCase();
			return (ua.indexOf('safari') !== -1 && !(ua.indexOf('chrome') > -1));
		}

		if (isSafari()) {
			document.body.classList.add('safari');
		}

		if(!langs.includes(lang!)){
			navigate("/et")
		}
	}, [lang])
	return (
		<>
			<script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-beta1/js/bootstrap.bundle.min.js"></script>
			<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
			<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
			<Outlet />
		</>
	);
};

export default Root;

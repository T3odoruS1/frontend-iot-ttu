import { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";


const Root = () => {
	const {lang} = useParams();
	const navigate = useNavigate();
	const langs = ["en", "et"];
	useEffect(() => {
		if(!langs.includes(lang!)){
			navigate("/et")
		}
	}, [lang])
	return (
		<>
			<script src="http://localhost:8097"></script>
			<script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-beta1/js/bootstrap.bundle.min.js"></script>
			<Outlet />
		</>
	);
};

export default Root;

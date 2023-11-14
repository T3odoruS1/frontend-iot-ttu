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
			<script src="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-beta1/js/bootstrap.bundle.min.js"></script>
			<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
			<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
			<Outlet />
		</>
	);
};

export default Root;

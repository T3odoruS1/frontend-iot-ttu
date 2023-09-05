import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/header/AdminHeader";
import Footer from "../../components/Footer";

const Admin = () => {
	return (
		<>
			<AdminHeader />
			<div className="m-5">
				<Outlet />
			</div>
			<Footer />

		</>
	);
};

export default Admin;

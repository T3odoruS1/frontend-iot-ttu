import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/header/admin/AdminHeader";
import Footer from "../../components/Footer";

const Admin = () => {
	return (
		<>
			<AdminHeader />
			<main >
				<div className="root-div">
				<Outlet />
				</div>
			</main>
			<Footer />

		</>
	);
};

export default Admin;

import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/header/AdminHeader";

const Admin = () => {
	return (
		<>
			<AdminHeader />
			<div className="m-5">
				<Outlet />
			</div>
		</>
	);
};

export default Admin;

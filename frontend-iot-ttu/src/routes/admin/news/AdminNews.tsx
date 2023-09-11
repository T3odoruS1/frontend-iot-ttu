import { Outlet } from "react-router-dom";

const AdminNews = () => {
	return (
		<div style={{width:"100%"}}>
			Uudiste haldamine
			<Outlet />
		</div>
	);
};

export default AdminNews;

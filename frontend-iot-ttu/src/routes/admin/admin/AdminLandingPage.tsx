import {useEffect} from "react";
import {useNavigate} from "react-router-dom";


const AdminLandingPage = () => {
   const navigate = useNavigate();
    useEffect(() => {
        navigate("./news")
    }, []);
    return (
        <>
        </>
    );
};

export default AdminLandingPage;